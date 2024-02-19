import { DocumentReference, Timestamp } from "firebase/firestore";
import { User } from "./User";

export interface Slide {
  id: string;
  uid: string;
  content: string;
  user: DocumentReference | User;
  likesCount: number;
  subSlidesCount: number;
  date: Timestamp;
}
