import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import liveStream100ms from "@/utils/liveStream100ms";

export async function POST(req: NextRequest) {
  try {
    const roomId = await req.json().then((res) => res.roomId);
    if (!roomId) return new NextResponse("Without room id", { status: 400 });

    if (req.method === "POST") {
      const managementToken = await liveStream100ms.getManagementToken();
      const result = await axios
        .get(
          `${liveStream100ms.listPeers}/${roomId}/peers`,

          {
            headers: {
              Authorization: `Bearer ${managementToken}`,
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
