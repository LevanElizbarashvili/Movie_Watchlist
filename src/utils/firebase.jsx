import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv7NPLQJuBUU1MS4xUtPyFycTmG3o3CZc",
  authDomain: "movietrackr-37fbc.firebaseapp.com",
  projectId: "movietrackr-37fbc",
  storageBucket: "movietrackr-37fbc.appspot.com",
  messagingSenderId: "730528060982",
  appId: "1:730528060982:web:c8656e4fee8c63c5e76a97",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const watchlistCollectionRef = collection(db, "movies");
