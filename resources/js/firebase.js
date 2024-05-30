import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_Pxxjr-V2b5dXe6tdoufjb7B6zwBtEbU",
  authDomain: "myproject-dbbec.firebaseapp.com",
  projectId: "myproject-dbbec",
  storageBucket: "myproject-dbbec.appspot.com",
  messagingSenderId: "547072391356",
  appId: "1:547072391356:web:33f72108eaa649ecb5f8b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMembers() {
  const collect = await collection(db, "member");
  const snapshot = await getDocs(collect);
  return snapshot;
}

export { db, getMembers };
