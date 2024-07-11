import { Link } from "react-router-dom";
import styles from "./PracNew.module.css";
import MBTISelect from "../components/MBTISelect";
import { useState } from "react";
import ColorInput from "../components/ColorInput";
import { addDatas } from "../lib/firebase";

// 랜덤함수뽑기

function generateRandomHexCode() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
}

function generateColorCode() {
  let colorCode = "#";
  for (let i = 0; i < 3; i++) {
    colorCode = colorCode + generateRandomHexCode();
  }
  console.log(colorCode);
  return colorCode;
}
// 기본값으로 초기화 함수

const INITAIL_VALUE = {
  mbti: "",
  colorCode: "",
};
function PracNew(props) {
  const [formValue, setFormValue] = useState(INITAIL_VALUE);

  const handleChange = (name, value) => {
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // console.log(formValue);

  const handleRandomClick = () => {
    const nextColorCode = generateColorCode();
    handleChange("colorCode", nextColorCode);
  };

  const handleSave = async () => {
    const result = await addDatas("pracMBTIColor", formValue);
    if (result) {
      alert("성공적으로 MBTI가 등록되었습니다");
      setFormValue(INITAIL_VALUE);
    } else {
      alert("관리자에게 문의하세요");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to="/">
          <img src="/images/x.svg" className={styles.cancelIcon} />
        </Link>
      </header>
      <section className={styles.section}>
        <h4 className={styles.sectionHeading}>MBTI</h4>
        <MBTISelect
          mbtivalue={formValue.mbti}
          onChange={(item) => handleChange("mbti", item)}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random} onClick={handleRandomClick}>
            <img className={styles.repeatIcon} src="/images/repeat.svg" />
          </button>
          <ColorInput
            colorCodeValue={formValue.colorCode}
            handleChange={(newColorCode) =>
              handleChange("colorCode", newColorCode)
            }
          />
        </h2>
      </section>
      <button className={styles.submit} onClick={handleSave}>
        컬러 등록
      </button>
    </div>
  );
}

export default PracNew;
