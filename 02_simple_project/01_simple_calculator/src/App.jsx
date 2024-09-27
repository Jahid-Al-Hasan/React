import { useEffect, useState } from "react";
import "./app.css";

function App() {
  const [value, setValue] = useState("");
  const [prevOperand, setPrevOperand] = useState("");

  function calculate() {
    try {
      // Only evaluate if there's an actual expression
      if (value.trim() === "") {
        setValue("");
        return;
      }

      // Ensure that the expression is valid before evaluating
      const result = eval(value);

      // Update the value only if the result is a finite number
      if (isFinite(result)) {
        setPrevOperand(value); // Save current expression before calculation
        setValue(String(result)); // Set the result as the new value
      } else {
        setValue("Error");
      }
    } catch (error) {
      setValue("Error");
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      // Handle number and operator key presses
      if (/[0-9]/.test(key)) {
        setValue((prev) => prev + key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        // Prevent multiple operators in a row
        if (/[+\-*/]$/.test(value)) {
          return; // Do nothing if the last character is already an operator
        }
        setValue((prev) => prev + key);
      } else if (key === "Enter") {
        event.preventDefault(); // Prevent form submission if in a form
        calculate(); // Call the calculation function
      } else if (key === "Backspace") {
        setValue((prev) => prev.slice(0, -1)); // Remove last character
      } else if (key === "Escape") {
        setValue(""); // Clear the calculator
      } else if (key === ".") {
        // Prevent multiple decimals in the same number
        if (/\.\d*$/.test(value) || /[+\-*/]$/.test(value)) {
          return; // Do nothing if there's already a decimal or after an operator
        }
        setValue((prev) => prev + ".");
      }
    };

    // Add event listener for key presses
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{prevOperand}</div>
        <div className="current-operand">{value}</div>
      </div>
      <button className="span-two" onClick={() => setValue("")}>
        AC
      </button>
      <button onClick={() => setValue(value.slice(0, -1))}>DEL</button>
      <button onClick={() => setValue((prev) => prev + "/")}>/</button>
      <button onClick={() => setValue((prev) => prev + "1")}>1</button>
      <button onClick={() => setValue((prev) => prev + "2")}>2</button>
      <button onClick={() => setValue((prev) => prev + "3")}>3</button>
      <button onClick={() => setValue((prev) => prev + "*")}>*</button>
      <button onClick={() => setValue((prev) => prev + "4")}>4</button>
      <button onClick={() => setValue((prev) => prev + "5")}>5</button>
      <button onClick={() => setValue((prev) => prev + "6")}>6</button>
      <button onClick={() => setValue((prev) => prev + "+")}>+</button>
      <button onClick={() => setValue((prev) => prev + "7")}>7</button>
      <button onClick={() => setValue((prev) => prev + "8")}>8</button>
      <button onClick={() => setValue((prev) => prev + "9")}>9</button>
      <button onClick={() => setValue((prev) => prev + "-")}>-</button>
      <button onClick={() => setValue((prev) => prev + ".")}>.</button>
      <button onClick={() => setValue((prev) => prev + "0")}>0</button>
      <button className="span-two" onClick={calculate}>
        =
      </button>
    </div>
  );
}

export default App;
