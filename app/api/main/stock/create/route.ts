import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { stockDetails } = await req.json();
    const {
      uid,
      picture,
      category,
      subCategory,
      brand,
      itemName,
      capacity,
      price,
      purchasingDate,
      expirationDate,
      used,
      note,
    } = stockDetails;
    if (!stockDetails.uid) {
      return new NextResponse("Without user id", { status: 404 });
    }
    const endDate = new Date(expirationDate);
    const currentDate = new Date();
    const remainingTime = endDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    const userCollection = doc(db, "users", `${stockDetails.uid}`);
    const stockList = collection(userCollection, "stocks");
    const newStock = doc(stockList); //產生一個新的doc跟ID出來
    await setDoc(newStock, {
      postID: newStock.id,
      uid: uid,
      picture: picture,
      category: category,
      subCategory,
      brand: brand,
      itemName,
      capacity: {
        amount: capacity.amount,
        unit: capacity.unit,
      },
      price: price,
      purchasingDate: purchasingDate,
      expirationDate: expirationDate,
      durationDay: remainingDays,
      used: used,
      note: note,
      createTime: serverTimestamp(),
    }); //依照上面的docID，set post的內容進去doc裡面

    return new NextResponse("OK", { status: 200 });
  }
}
