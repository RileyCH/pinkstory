import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/utils/database";

export async function GET() {
  const headersInstance = headers();
  const uid = headersInstance.get("Authorization");

  if (!uid) {
    return new Response("Uid is wrong", { status: 400 });
  }

  const sanitizedUid = uid.replace("Bearer ", "");
  const userCollection = doc(db, "users", sanitizedUid);
  const userDoc = await getDoc(userCollection);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return new NextResponse(JSON.stringify(userData));
  } else {
    return new NextResponse("Wrong user id", { status: 404 });
  }
}
