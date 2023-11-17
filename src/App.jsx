import { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "`!@#$%^&*()_+-=[]{};':|,.<>/?~";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, characterAllowed, numberAllowed, setpassword]);

  const copytoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    toast.success("copied to clipboard");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, characterAllowed, numberAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-6 px-3 my-8 text-orange-800 bg-gray-800">
        <h1 className="text-center text-4xl text-white my-5">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          {" "}
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mx-1 rounded-md"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copytoclipboard}
            className="outline-none bg-blue-600 text-white px-3 py-1 shrink-0 rounded-sm"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label className="text-orange-500">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1 mx-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-500">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 mx-2">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => {
                setcharacterAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-500">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
