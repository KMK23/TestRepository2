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

// 필드, 조건, 부합하는 값을 가져와야 정렬가능 ==> 정렬을 위한 함수야
// options 객체 형태로 넘겨줄꺼임 그 객체에는 order 라는 프로퍼티를 넣어줄꺼야
async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // const q = query(컬렉션정보, 조건1, 조건2, ...)
  const q = query(collect, orderBy(options.order, "desc"));
  const snapshot = await getDocs(q);
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
  // 만약 정렬을 두개 하고 싶으면 orderBy를 한개 더 쓰면 된다
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
  //스토리지에 있는 이미지를 삭제할때 필요한것==> 파일명(경로포함) or 파일 url==>(이건 파이어베이스에 기본으로 있는것. 찾아보면 나옴)

  //스토리지 객체 생성
  const storage = getStorage();
  let message;

  try {
    //삭제할 파일의 참조 객체 생성 ==>(ref함수 사용)
    message = "이미지 삭제에 실패했습니다. \n관리자에게 문의하세요";
    const deleteRef = ref(storage, imgUrl);

    //실제 삭제하는 것은 deleteObject라는 firebase함수
    await deleteObject(deleteRef);

    ////////////////////////여기까지 스토리지에 있는거 삭제 끝//////////

    //////////database에 있는 문서 삭제 ////////////////////////

    // 삭제할 문서의 참조 객체 생성(doc함수 사용)
    message = "문서 삭제에 실패했습니다. \n관리자에게 문의하세요";
    const deleteDocRef = doc(db, collectionName, docId);
    // 문서 삭제
    await deleteDoc(deleteDocRef);

    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
  // finally {
  //   얘는 trycatch 가 누가 실행되건 마지막에 무조건 실행해
  // }
}

async function updateDatas(collectionName, dataObj, docId) {
  const docRef = await doc(db, collectionName, docId);
  // 수정할 데이터 양식 생성=> title,content,calorie,updateAt,imgUrl
  const time = new Date().getTime();
  dataObj.updatedAt = time;
  //사진 파일이 수정 되면 ==>기존 사진 삭제 ==> 새로운 사진추가 ==> url 받아와서 imgUrl 값 셋팅

  if (dataObj.imgUrl !== null) {
    //기존 사진 url 가져오기
    const docSnap = await getDocs(docRef);
    const prevImgUrl = docSnap.data().imgUrl;
    //스토리지에서 기존 사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, prevImgUrl);
    await deleteObject(deleteRef);
    //새로운 사진 추가
    const uuid = crypto.randomUUID();
    const path = `food/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;
  } else {
    //imgUrl 프로퍼티 삭제(사진 안바뀌었을때는 imgUrl에 null 값이니까 그럼 엑박뜸)
    delete dataObj["imgUrl"];
  }
  await updateDoc(docRef, dataObj);
  const updateData = await getDoc(docRef);
  const resultData = { docId: updateData.id, ...updateData.data() };
  return resultData;
}

export {
  db,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
  addDatas,
  deleteDatas,
  updateDatas,
};
