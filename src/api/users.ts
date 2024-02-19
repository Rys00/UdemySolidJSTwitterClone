import {
  QueryConstraint,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../db";
import { User } from "../types/User";

const getUsers = async (loggedInUser: User) => {
  const constrains: QueryConstraint[] = [where("uid", "!=", loggedInUser.uid)];
  const q = query(collection(db, "users"), ...constrains);
  const qSnapshot = await getDocs(q);

  const users = qSnapshot.docs.map((doc) => {
    const user = doc.data() as User;
    return user;
  });

  return users;
};

export { getUsers };
