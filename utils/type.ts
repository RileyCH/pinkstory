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
