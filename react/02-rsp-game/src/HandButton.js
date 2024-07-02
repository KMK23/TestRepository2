import HandIcon from "./HandIcon";
function HandButton({ value }) {
  return (
    <button>
      <HandIcon value={value} />
    </button>
  );
}
export default HandButton;
