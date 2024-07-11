import React from "react";
import styles from "./ColorInput.module.css";

function ColorInput({ colorCodeValue, handleChange }) {
  const onChange = (e) => {
    handleChange(e.target.value);
  };

  const isValidColorCode = (colorCodeValue) => {
    const regxp = /^#[a-fA-F0-9]{6}$/;
    return regxp.test(colorCodeValue);
  };
  const handleBlur = () => {
    if (!isValidColorCode(colorCodeValue)) {
      alert("# 포함, a-z까지, A-Z까지 총 7자리로 작성해주세요");
      handleChange("#000000");
    }
  };

  return (
    <div className={styles.colorInputContainer}>
      <input
        className={styles.colorInput}
        value={colorCodeValue}
        maxLength={7}
        onBlur={handleBlur}
        onChange={onChange}
      />
      <span
        className={styles.colorInputChip}
        style={{ backgroundColor: colorCodeValue }}
      ></span>
    </div>
  );
}

export default ColorInput;
