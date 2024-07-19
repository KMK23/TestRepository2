import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData, updateDatas } from "../api/firebase";
import styles from "./CoursePage.module.css";

function CoursePage() {
  const navigate = useNavigate();
  const props = useLocation();
  console.log(props);
  const slug = useParams();
  const { pathname } = props;
  //   console.log(slug);
  //간단한 정보들만 useLocation 써서 하는거고 중요정보는 다시 데이터 베이스로 받아서 사용해야한다.
  // console.log(props);
  const { courseSlug } = useParams();
  //   useParams 에 안에 있는걸 구조 분해한것

  const [course, setCourse] = useState();

  const courseColor = getCourseColor(course?.code);
  //   ?는 옵셔널체이닝 = ?앞에 있는거에서 null or undifined 이면 멈추고 뒤에 code 까지 안감
  // undefined 여기서 끝
  // undefined.code
  //   if(course){
  //     getCourseColor(course.code)
  //   }
  const headerStyle = {
    borderColor: courseColor,
  };
  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishListClick = async () => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member) {
      const result = await updateDatas("member", member.docId, course, {
        type: "ADD",
        fieldName: "courseList",
      });
      if (result) {
        navigate("/wishlist");
      } else {
        alert("코스 담기를 실패했습니다. \n관리자에게 문의하세요");
      }
    } else {
      alert("로그인 해주세용");
      navigate("/login", { state: pathname });
      // /가 없으면 주소 마지막에 부분이 바뀌는거야 => localhost:3001/courses/login
      // /가 있으면 localhost:3001/login 이렇게 되는거여
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishListClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card className={styles.topic} key={topic.slug}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
