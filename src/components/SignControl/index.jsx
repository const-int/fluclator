import "./sign-control.css";

export default function SignControl({ isPositive, onClick }) {
  return (
    <button type="button" className="sign-control is-active" onClick={onClick}>
      <i className={`fas fa-${isPositive ? "plus" : "minus"}`} />
    </button>
  );
}
