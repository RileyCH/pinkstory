import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req);

  return new NextResponse("OK", { status: 200 });
}
