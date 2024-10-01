// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth1-8c744.firebaseapp.com",
  projectId: "mern-auth1-8c744",
  storageBucket: "mern-auth1-8c744.appspot.com",
  messagingSenderId: "436830891545",
  appId: "1:436830891545:web:eae507e1d9aee2207f4488",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
