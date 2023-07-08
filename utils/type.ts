import { Timestamp } from "firebase/firestore";

export type UserLoginInitialState = {
  uid: string | null;
  loginStatus: boolean;
  loading: boolean;
  error: string;
};

export interface UserDataType {
  uid: string | null;
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
  gender: string | null;
  introduction: string | null;
  keptPost: string[] | [];
  liveStream: {
    roomId: string;
    hostRoomCode: string;
    guestRoomCode: string;
  };
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

export interface StockType {
  stockId: string;
  data: {
    stockId: string;
    uid: string;
    picture: string[] | [];
    category: string | null;
    subCategory: string | null;
    brand: string | null;
    itemName: string | null;
    amount: string | null;
    capacity: {
      itemCapacity: string | null;
      unit: string | null;
    };
    price: string | null;
    purchasingDate: string | null;
    expirationDate: string | null;
    durationDay: number | null;
    used: string | null;
    note: string | null;
    createTime: Timestamp | any;
  };
}

export interface ChatRoomType {
  chatRoomId: string;
  data: {
    roomId: string;
    uid: string[];
    message: { content: string; sentTime: Timestamp; uid: string }[];
  };
}
