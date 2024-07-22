import React from "react";
import cn from "classnames";
import styles from "./Avatar.module.css";

function Avatar({ className, photoUrl, name }) {
  return (
    <img className={cn(styles.Avatar, className)} src={photoUrl} title={name} />
  );
}
export default Avatar;
