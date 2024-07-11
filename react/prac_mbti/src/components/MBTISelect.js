import React from "react";
import styles from "./MBTIselect.module.css";

const mbtiArr = [
  { mbti: "E", desc: "외향형", groupNum: 0 },
  { mbti: "I", desc: "내향형", groupNum: 0 },
  { mbti: "S", desc: "감각형", groupNum: 1 },
  { mbti: "N", desc: "직관형", groupNum: 1 },
  { mbti: "F", desc: "감정형", groupNum: 2 },
  { mbti: "T", desc: "사고형", groupNum: 2 },
  { mbti: "P", desc: "인식형", groupNum: 3 },
  { mbti: "J", desc: "판단형", groupNum: 3 },
];
function MBTIOption({ option, selected, changeMBTI }) {
  const { mbti, desc, groupNum } = option;
  const className = `${styles.mbtiOption} ${selected ? styles.selected : ""}`;
  const handleMbtiClick = () => {
    // console.log(groupNum, mbti);
    changeMBTI(groupNum, mbti);
  };
  return (
    <div className={className} onClick={handleMbtiClick}>
      <span className={styles.mbtiChar}>{mbti}</span>
      {desc}
    </div>
  );
}

function MBTISelect({ mbtivalue, onChange }) {
  const changeMBTI = (myGroupNum, myMBTI) => {
    if (mbtivalue[myGroupNum] !== myMBTI) {
      const beforeValue = mbtivalue.slice(0, myGroupNum);
      const afterValue = mbtivalue.slice(myGroupNum + 1);
      const nextValue = beforeValue + myMBTI + afterValue;
      onChange(nextValue);
    }
  };
  return (
    <div className={styles.mbtiOptions}>
      {mbtiArr.map((option, idx) => {
        return (
          <MBTIOption
            option={option}
            key={idx}
            selected={mbtivalue[option.groupNum] == option.mbti}
            changeMBTI={changeMBTI}
          />
        );
      })}
    </div>
  );
}

export default MBTISelect;
