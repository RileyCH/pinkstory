import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { user } = await req.json();
    if (!user) {
      return new NextResponse("Without user data", { status: 404 });
    }

    // const userData = {
    //   uid: "zIUwj5lt3GgQvlpeMcit7DY92P83",
    //   name: "Daniel",
    //   age: "27",
    //   birth: {
    //     date: 5,
    //     month: 3,
    //     year: 1996,
    //   },
    //   constellations: "雙魚座",
    //   gender: "male",
    //   introduction: "工程師，對新科技和創新有濃厚興趣",
    //   bgImg: "",
    //   follower: [""],
    //   following: [""],
    //   chatRoomId: [""],
    //   liveStream: {
    //     roomId: "64ae990d98586b7b14d1aa64",
    //     hostRoomCode: "qlo-zmdw-qsd",
    //     guestRoomCode: "qlt-ralj-rzw",
    //   },
    //   followingCategory: {
    //     book: 85,
    //     food: 43,
    //     pet: 98,
    //     travel: 167,
    //   },

    //   keptPost: [""],
    //   profileImg: "",
    //   registedDate: "time",
    //   thumbnailedPost: [""],
    // };

    const userCollection = collection(db, "users");
    const newUser = doc(userCollection, user.uid);
    await setDoc(newUser, user);

    return new NextResponse("OK", { status: 200 });
  }
}
