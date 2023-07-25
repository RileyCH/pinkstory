import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  getDocs,
  query,
  collectionGroup,
  where,
  doc,
} from "firebase/firestore";
import { db } from "@/utils/database";
import { PostType } from "@/utils/type";

export async function GET() {
  const headersInstance = headers();
  const uid = headersInstance.get("Authorization");

  if (!uid) {
    return new Response("Wrong Uid", { status: 400 });
  }

  const sanitizedUid = uid.replace("Bearer ", "");
  const postCollection = collectionGroup(db, "posts");
  const q = query(
    postCollection,
    where("keepUser", "array-contains", `${sanitizedUid}`)
  );
  const querySnapshot = await getDocs(q);
  const keptPosts: PostType[] = [];
  querySnapshot.forEach((doc) => {
    keptPosts.push({
      postID: doc.id,
      data: {
        tagUer: doc.data().tagUer,
        title: doc.data().title,
        authority: doc.data().title,
        address: {
          area: doc.data().address.area,
          city: doc.data().address.city,
        },
        picture: doc.data().picture,
        uid: doc.data().uid,
        location: {
          lon: doc.data().location.lon,
          lat: doc.data().location.lat,
        },
        category: doc.data().category,
        content: doc.data().content,
        status: doc.data().status,
        loveUser: doc.data().loveUser,
        createTime: doc.data().createTime,
        keepUser: doc.data().keepUser,
      },
    });
  });
  return new NextResponse(JSON.stringify(keptPosts));
}
