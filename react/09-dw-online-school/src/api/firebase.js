import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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

async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };
  return resultData;
}
// getDatas를 써도 되지만 로그인쪽에서 처리를 해야하니까 그냥 여기다 쓰고 return만 받게 하려고 쓴거야

async function getMember(values) {
  const { email, password } = values;
  const collect = collection(db, "member");
  const q = query(collect, where("email", "==", email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  let message;
  let memberObj = {};

  if (docs.length == 0) {
    message = "이메일이 올바르지 않다";
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = "로그인 성공";
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = "패스워드가 일치하지 않다";
    }
  }
  return { memberObj, message };
}
export { getDatas, getData, getMember };
