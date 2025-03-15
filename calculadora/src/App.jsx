import { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <h1>Samsung</h1>
      <div className="display">{input}</div>
      <div className="buttons">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((char) => (
          <button
            key={char}
            onClick={() =>
              char === "=" ? calculateResult() : handleClick(char)
            }
            className="button"
          >
            {char}
          </button>
        ))}
        <button onClick={clearInput} className="button clear">
          Limpiar
        </button>
      </div>
    </div>
  );
}
