import "./style.css";

function Button({ className, onClick = () => {}, label }) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
