import { Timestamp } from "firebase/firestore";
export interface UserDataType {
  uid: string;
  age: number | null;
  bgImg: string | null;
  birth: {
    date: number | null;
    month: number | null;
    year: number | null;
  };
  constellations: string | null;
  follower: string[] | [];
  following: string[] | [];
  followingCategory: { [key: string]: number };
  gender: "Female" | "Male" | "Unknown";
  introduction: string | null;
  keptPost: string[] | [];
  liveStreamRoomID: string;
  name: string;
  profileImg: string | null;
  registedDate: number;
  thumbnailedPost: string[] | [];
}

export interface PostType {
  postID: string;
  data: {
    tagUer: string[] | [];
    title: string | null;
    authority: string | null;
    address: { area: string | null; city: string | null };
    picture: string[] | [];
    uid: string;
    location: { lon: number | null; lat: number | null };
    category: string | null;
    content: string | null;
    status: string | null;
    loveUser: string[] | [];
    createTime: Timestamp | any;
    keepUser: string[] | [];
  };
}

export interface CommentType {
  content: string;
  commentTime: Timestamp | any;
  loveUser: string[] | [];
  uid: string | null;
}
