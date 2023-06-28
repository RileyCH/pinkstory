import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "streaming-room.json");
}

export function extractFeedbackData() {
  const filePath = buildFeedbackPath();
  const fileData = fs.readFileSync(filePath);
  return fileData;
}

export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const result = await req.json();
      console.log(result);

      // if (result.type === "session.open.success") {
      //   const filePath = buildFeedbackPath();
      //   const existingData = fs.readFileSync(filePath).toString();
      //   const feedbackData = JSON.parse(existingData);

      //   feedbackData.event.push(result);

      //   fs.writeFileSync(filePath, JSON.stringify(feedbackData));
      // }

      // if (result.type === "session.close.success") {
      //   const filePath = buildFeedbackPath();
      //   const existingData = fs.readFileSync(filePath).toString();
      //   const feedbackData = JSON.parse(existingData);
      //   feedbackData.event = feedbackData.event.filter(
      //     (event: any) => event.data.room_id !== result.data.room_id
      //   );

      //   fs.writeFileSync(filePath, JSON.stringify(feedbackData));
      // }

      if (result.type === "peer.join.success" && result.data.role === "host") {
        const filePath = buildFeedbackPath();
        const existingData = fs.readFileSync(filePath).toString();
        const feedbackData = JSON.parse(existingData);

        feedbackData.event.push(result);

        fs.writeFileSync(filePath, JSON.stringify(feedbackData));
      }

      if (result.type === "peer.leave.success" && result.data.role === "host") {
        const filePath = buildFeedbackPath();
        const existingData = fs.readFileSync(filePath).toString();
        const feedbackData = JSON.parse(existingData);
        feedbackData.event = feedbackData.event.filter(
          (event: any) => event.data.room_id !== result.data.room_id
        );

        fs.writeFileSync(filePath, JSON.stringify(feedbackData));
      }

      return new NextResponse("OK", {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
