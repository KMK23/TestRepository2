import HandIcon from "./HandIcon";

function HandButton({ value, onClick }) {
  const HandleClick = () => {
    onClick(value);
  };
  return (
    <button className="HandButton" onClick={HandleClick}>
      <HandIcon value={value} className="HandButton-icon" />
    </button>
  );
}

export default HandButton;

//  고양이가 머리를 하면?
