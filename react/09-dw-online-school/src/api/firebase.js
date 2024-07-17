import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9Y2muR79WrI0bjBXhCnNuQxBHaRajIM4",
  authDomain: "dwos-bab13.firebaseapp.com",
  projectId: "dwos-bab13",
  storageBucket: "dwos-bab13.appspot.com",
  messagingSenderId: "294440820448",
  appId: "1:294440820448:web:bb750e3a8c8fd4b61f7a85",
  measurementId: "G-K0XMPM93B9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}
export { getDatas };
