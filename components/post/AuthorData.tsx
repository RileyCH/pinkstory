import { headers } from "next/headers";
import axios from "axios";
import Image from "next/image";
import profile from "@/public/main/profile.png";

async function getAuthorName(authorId: string) {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");
  const result = await axios
    .get(`${protocol}://${host}/api/user-data`, {
      headers: {
        Authorization: `Bearer ${authorId}`,
      },
    })
    .then((res) => {
      if (res.status === 200) return res.data;
    });
  return result;
}

const AuthorData = async ({ authorId }: { authorId: string }) => {
  const authorData = await getAuthorName(authorId);

  return (
    <div className="flex gap-2 items-center">
      <div className="w-[15px] h-[15px] relative md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]">
        <Image
          src={authorData.profileImg ? authorData.profileImg : profile}
          alt="post author profile image"
          fill
          className="rounded-full object-cover"
          sizes="100%"
        />
      </div>

      <p className="text-[12px] text-darkPink md:text-[14px]">
        {authorData.name}
      </p>
    </div>
  );
};

export default AuthorData;
