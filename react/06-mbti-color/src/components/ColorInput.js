import React, { useEffect, useState } from "react";
import styles from "./ColorInput.module.css";

function ColorInput(props) {
  return (
    <div className={styles.colorInputContainer}>
      <input className={styles.colorInput} />
      <span
        className={styles.colorInputChip}
        style={{ backgroundColor: "#f2f2f2" }}
      ></span>
    </div>
  );
}

export default ColorInput;
