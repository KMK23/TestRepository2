import rock from "./assets/rock.svg";
import scissor from "./assets/scissor.svg";
import paper from "./assets/paper.svg";

const IMGAGE = {
  rock: rock,
  scissor: scissor,
  paper: paper,
};

function HandIcon({ value, className }) {
  const src = IMGAGE[value];
  return <img src={src} className={className} />;
}

export default HandIcon;
