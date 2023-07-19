import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import liveStream100ms from "@/utils/liveStream100ms";

export async function POST(req: NextRequest) {
  try {
    const roomId = await req.json().then((res) => res.roomId);
    if (!roomId) return new NextResponse("Without room id", { status: 400 });
    console.log(roomId);

    if (req.method === "POST") {
      const result = await axios
        .get(
          `${liveStream100ms.listPeers}/${roomId}/peers`,

          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODk3NDQ3MTcsImV4cCI6MTY4OTgzMTExNywianRpIjoiand0X25vbmNlIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE2ODk3NDQ3MTcsImFjY2Vzc19rZXkiOiI2NDhmMzc1OTkxYzAyM2I0ZTJkNzY3OGMifQ._CLPHk_qtG6bi78Ar3vP2hY7Ya0F-7z3HG_Q-eSy7zg`,
              //   "Content-Type": "application/json",
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
