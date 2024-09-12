import "./style.css";

function InputText({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="What do you want to do today?"
      value={value}
      onChange={handleChange}
    />
  );
}

export default InputText;
