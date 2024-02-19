import {
  DocumentReference,
  QueryConstraint,
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { Slide } from "../types/Slide";
import { db } from "../db";
import { User } from "../types/User";

const getGlides = async (startFromSlide: QueryDocumentSnapshot | null) => {
  const constrains: QueryConstraint[] = [orderBy("date", "desc"), limit(10)];
  if (!!startFromSlide) {
    constrains.push(startAfter(startFromSlide));
  }
  const q = query(collection(db, "slides"), ...constrains);
  const qSnapshot = await getDocs(q);
  const lastSlideRef = qSnapshot.docs[9];

  const slides: Slide[] = await Promise.all(
    qSnapshot.docs.map(async (doc) => {
      const slide = doc.data() as Slide;
      const userSnap = await getDoc(slide.user as DocumentReference);

      slide.user = userSnap.data() as User;

      return { ...slide, id: doc.id };
    })
  );

  return { slides, lastSlideRef };
};

const createSlide = async (form: {
  content: string;
  uid: string;
}): Promise<Slide> => {
  const userRef = doc(db, "users", form.uid);

  const slideToStore = {
    ...form,
    likesCount: 0,
    subSlidesCount: 0,
    date: Timestamp.now(),
    user: userRef,
  };

  const slideCollection = collection(db, "slides");
  const added = await addDoc(slideCollection, slideToStore);

  return { ...slideToStore, id: added.id };
};

export { createSlide, getGlides };
