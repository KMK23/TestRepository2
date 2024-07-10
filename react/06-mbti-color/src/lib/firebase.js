import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMjH2u7MdHMfoe0MxxjYsMeBPKq0tW1Zg",
  authDomain: "mbti-project-50b8c.firebaseapp.com",
  projectId: "mbti-project-50b8c",
  storageBucket: "mbti-project-50b8c.appspot.com",
  messagingSenderId: "575450297390",
  appId: "1:575450297390:web:71fdabff39be0960fe5bbf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  // 컬렉션 정보 = 컬렉션 함수안에 db, collectionName 파라미터 받고
  const q = query(collect, orderBy(order, "desc")); // desc : 내림차순
  // order 라는 정렬을 하기 위해 query가 필요했음 orderBy를 쓰고 그안에 파라미터를 order, 그다음 뭐로 정렬할껀지
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  //   debugger;
  return resultData;
}
export { getAllDatas };
