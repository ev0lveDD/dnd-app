import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfGRlK4LLSLc6lC8JMnMkePlsR___XrM8",
  authDomain: "my-dnd-app-11be1.firebaseapp.com",
  projectId: "my-dnd-app-11be1",
  storageBucket: "my-dnd-app-11be1.appspot.com",
  messagingSenderId: "703286666387",
  appId: "1:703286666387:web:d94e857a4dc1f903ad5966",
  measurementId: "G-54BQN286D2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
