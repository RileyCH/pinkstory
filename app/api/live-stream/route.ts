import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import liveStream100ms from "@/utils/liveStream100ms";

export async function GET(req: NextRequest) {
  try {
    const result = await axios.get(`${liveStream100ms.activeSessions}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_NEXT_PUBLIC_100MS_MANAGEMENT_TOKEN}`,
      },
    });
    const streamingRooms = result.data;
    return new NextResponse(JSON.stringify(streamingRooms), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
