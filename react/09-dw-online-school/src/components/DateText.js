import React from "react";

function DateText({ value }) {
  if (!value) return;
  return new Date(value).toLocaleDateString("ko-KR");
  //  한국시간으로 바꾸기
}

export default DateText;
