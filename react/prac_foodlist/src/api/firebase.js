import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  // setDoc,
  doc,
  addDoc,
  //여기에 쓰는건 firebase.js 에서 필요한것들..
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
  // getDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUi7Uvi3g2C5INykAnx9Os7y7kqRX7QbM",
  authDomain: "movie-edit-c7ed4.firebaseapp.com",
  projectId: "movie-edit-c7ed4",
  storageBucket: "movie-edit-c7ed4.appspot.com",
  messagingSenderId: "751093375664",
  appId: "1:751093375664:web:fd1b6fdb31fe2ff46b9175",
  measurementId: "G-TXE5QEQFKS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

async function getDatasByOrderLimit(collectionName, options) {
  const { fieldName, limits, lq } = options;
  let q;
  if (!lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      startAfter(lq),
      limit(limits)
    );
  }
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return { resultData, lastQuery };
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, dataObj) {
  // 파일저장 ==> 스토리지의 이미지 URL 을 가져와서 ==> dataObj의 imgUrl 값으로 변경
  const path = createPath("food/");
  const url = await uploadImage(path, dataObj.imgUrl);
  dataObj.imgUrl = url;
  // 위에것은 실제 경로로 갈아 끼워주는 역할

  // id생성
  const lastId = await getLastNum(collectionName, "id");
  dataObj.id = lastId + 1;

  // 시간 정보 생성
  const time = new Date().getTime();
  dataObj.createdAt = time;
  dataObj.updatedAt = time;

  //컬렉션에 저장
  await addDoc(getCollection(collectionName), dataObj);
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

export { getDatas, addDatas, getDatasByOrderLimit };
