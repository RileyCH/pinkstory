import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/database";

export async function GET() {
  const headersInstance = headers();
  const uid = headersInstance.get("Authorization");

  if (!uid) {
    return new Response("Uid is wrong", { status: 400 });
  }

  const sanitizedUid = uid.replace("Bearer ", "");
  const userCollection = doc(db, "users", sanitizedUid);
  const stockList = collection(userCollection, "stocks");
  // const q = query(stockList, orderBy("durationDay"));
  const stockDoc = await getDocs(stockList);

  if (!stockDoc) {
    return new NextResponse("No posts", { status: 404 });
  }

  const stocks: any = [];
  stockDoc.forEach((doc) => {
    stocks.push({
      stockId: doc.id,
      data: doc.data(),
    });
  });
  return new NextResponse(JSON.stringify(stocks));
}
