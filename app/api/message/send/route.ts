import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { postDetails } = await req.json();
    const {
      uid,
      picture,
      category,
      title,
      content,
      tagUer,
      location,
      address,
      authority,
      status,
      loveUser,
      keepUser,
    } = postDetails;
    if (!postDetails.uid) {
      return new NextResponse("Without user id", { status: 404 });
    }

    const userCollection = doc(db, "users", `${postDetails.uid}`);
    const postList = collection(userCollection, "posts");
    const newPost = doc(postList); //產生一個新的doc跟ID出來
    await setDoc(newPost, {
      postID: newPost.id,
      uid: uid,
      picture: picture,
      category: category,
      title: title,
      content: content,
      tagUer: tagUer,
      location: { lon: location.lon, lat: location.lat },
      address: { area: address.area, city: address.city },
      authority: authority,
      status: status,
      loveUser: loveUser,
      keepUser: keepUser,
      createTime: serverTimestamp(),
    }); //依照上面的docID，set post的內容進去doc裡面

    return new NextResponse("OK", { status: 200 });
  }
}
