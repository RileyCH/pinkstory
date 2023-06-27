import React from "react";
import { useRouter } from "next/router";

const page = ({ params }: { params: { roomid: string } }) => {
  return <div>{params.roomid}</div>;
};

export default page;
