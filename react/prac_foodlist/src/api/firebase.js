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
  const result = await addDoc(getCollection(collectionName), dataObj);
  const docSnap = await getDoc(result);
  // getDoc에 넣는게 documentReference를 넣어야하는데 이미 result로 만들었어
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
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

async function deleteDatas(collectionName, docId, imgUrl) {
  const storage = getStorage();
  try {
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    const deleteDocRef = doc(db, collectionName, docId);
    await deleteDoc(deleteDocRef);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, dataObj, docId, imgUrl) {
  //문서 업데이트시 필요한 함수 (updateDoc)=> doc참조객체, 수정할 데이터 객체
  const docRef = await doc(db, collectionName, docId);
  //수정 시점
  //저장되어있는 시간관련 필드들의 값이 밀리세컨드로 되어있기 때문에 getTime()함수 사용
  const time = new Date().getTime();

  // 사진 파일을 변경하지 않았을때
  if (dataObj.imgUrl === null) {
    // 사진이 변경되지 않았을때 imgUrl 값이 null로 넘어 오기 때문에
    // 그 상태로 문서를 update 해버리면 imgUrl 값이 null 로 바뀐다.
    // 그렇기 때문에 updateObj 에서 imgUrl 프로퍼티를 삭제해준다.
    delete dataObj["imgUrl"];
  } else {
    // 사진 파일을 변경했을 때
    // 기존 사진 삭제

    //1.스토리지 객체 생성
    const storage = getStorage();
    //2. 삭제할 파일 참조 객체 생성
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    //변경한 사진을 스토리지에 저장
    const url = await uploadImage(createPath("food/"), dataObj.imgUrl);
    //스토리지에 저장하고 그 파일의 url을 가져와서 dataObj의 imgUrl을 변경해준다.
    //왜? ==> 기존 dataObj에 있는 imgUrl은 "File"객체이고,
    //우리가 데이터베이스에 저장해야 할 imgUrl은 문자열 url 이기 때문에
    dataObj.imgUrl = url;
  }

  //updatedAt 필드에 넣어줄 시간 데이터를 dataObj에 넣어준다
  dataObj.updatedAt = time;

  // 문서 필드 데이터 수정

  await updateDoc(docRef, dataObj);
  // 업데이트 하고 나서 문서 데이터가 필요해 왜나면 그걸 이용해서 id도 찾고 뭐도 찾고 하니까
  //그래서 docRef라는 문서 참조 객체를 가져와서 .data(), docId를 뽑아냈어
  // 이건 일반적으로 getDatas 할때 뽑아낸거랑 똑같아
  const docSnap = await getDoc(docRef);
  const resultData = { ...docSnap.data(), docId };
  return resultData;
}

export { getDatas, addDatas, getDatasByOrderLimit, deleteDatas, updateDatas };
