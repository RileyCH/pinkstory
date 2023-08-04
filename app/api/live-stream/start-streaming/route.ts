import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import liveStream100ms from "@/utils/liveStream100ms";

//temp for compile
export async function GET(req: NextRequest) {
  try {
    const managementToken = await liveStream100ms.getManagementToken();
    const result = await axios.get(`${liveStream100ms.activeSessions}`, {
      headers: {
        Authorization: `Bearer ${managementToken}`,
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
