import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";

function Button({ variant, ...restProps }) {
  // debugger;

  return (
    <button
      {...restProps}
      className={cn(styles.button, variant && styles[variant])}
      // Button 에 variant = "round" 라고 프롭을 보냈어 그다음에 여기서 저걸 받았고
      // 그리고 조건부 렌더링 했고
      // styles 가 객체 모양이라 원래는 sytyles.round 이게 들어가야하는데 그게 variant 라는 프롭에 들어가 있으니까 styles.variant 가 되지 근데 변수로 받기 위해 [] 괄호를 썼다
    />
  );
}

export default Button;
