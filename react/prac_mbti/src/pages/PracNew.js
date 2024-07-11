import { Link } from "react-router-dom";
import styles from "./PracNew.module.css";
import MBTISelect from "../components/MBTISelect";
import { useState } from "react";
import ColorInput from "../components/ColorInput";

function PracNew(props) {
  const [formValue, setFormValue] = useState({
    mbti: "INTJ",
    colorCode: "#f2f2f2",
  });

  const handleChange = (name, value) => {
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // console.log(formValue);

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
          <button className={styles.random}>
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
      <button className={styles.submit}>컬러 등록</button>
    </div>
  );
}

export default PracNew;
