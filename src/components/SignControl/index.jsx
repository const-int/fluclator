import "./sign-control.css";

export default function SignControl({ isPositive, onClick }) {
  return (
    <div className="sign-control">
      <button
        type="button"
        className="sign-control__button is-active"
        onClick={onClick}
      >
        <i className={`fas fa-${isPositive ? "plus" : "minus"}`} />
      </button>
    </div>
  );
}
