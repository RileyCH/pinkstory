import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { user } = await req.json();
    if (!user) {
      return new NextResponse("Without user data", { status: 404 });
    }

    const userCollection = collection(db, "users");
    const newUser = doc(userCollection, "ZDgxNXpGBOP7RMwA0hcTolE943Q2");
    await setDoc(newUser, user);

    return new NextResponse("OK", { status: 200 });
  }
}
