import { DocumentReference } from "firebase/firestore";

export interface User {
  uid: string;
  fullName: string;
  email: string;
  nickname: string;
  avatar: string;
  followers: DocumentReference[];
  following: DocumentReference[];
  followersCount: number;
  followingCount: number;
}
