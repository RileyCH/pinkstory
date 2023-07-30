import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import liveStream100ms from "@/utils/liveStream100ms";

export async function POST(req: NextRequest) {
  try {
    const { userName } = await req.json();
    if (!userName)
      return new NextResponse("Without user name", { status: 400 });

    if (req.method === "POST") {
      const currentDate = new Date();
      const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

      const result = await axios
        .post(
          `${liveStream100ms.createRoom}`,
          {
            name: `new-room-${unixTimestamp}`,
            description: "PinkStory live stream room",
            template_id: process.env.NEXT_NEXT_PUBLIC_100MS_TEMPLATE_ID,
            region: "us",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_NEXT_PUBLIC_100MS_MANAGEMENT_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res);

      return new NextResponse(JSON.stringify(result.data), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
