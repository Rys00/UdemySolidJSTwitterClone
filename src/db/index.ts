// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6XeZCxKIMB4kheHdXGlBfmH4CxU6TbIs",
  authDomain: "slider-28a59.firebaseapp.com",
  projectId: "slider-28a59",
  storageBucket: "slider-28a59.appspot.com",
  messagingSenderId: "182475714336",
  appId: "1:182475714336:web:b8efd181e46833846ef145",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
