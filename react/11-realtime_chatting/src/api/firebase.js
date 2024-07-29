import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeVN97OEIfGXZUVLvRsN635iMiPvhlOIM",
  authDomain: "chatting-c37e8.firebaseapp.com",
  projectId: "chatting-c37e8",
  storageBucket: "chatting-c37e8.appspot.com",
  messagingSenderId: "652655593089",
  appId: "1:652655593089:web:d06ed18a884079cc782f80",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

export { getUserAuth };
