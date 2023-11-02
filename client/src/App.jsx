import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // store our from and to language in state
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  // store the word we want to translate in state
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

  // on change finction for the input of the word we want to translate
  // onsubmit function that calls our API to get the translation

  async function handleTranslate(event) {
    event.preventDefault();
    const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    const APIPIC = ``;
    const resAPIPIC = await axios.get(APIPIC);

    setTranslation(res.data.translation);
    console.log(translation);
  }

  return (
    <>
      <form onSubmit={handleTranslate}>
        <div className="container">
          <select onChange={(event) => setFrom(event.target.value)}>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="ar">Arabic</option>
            <option value="tr">Turkish</option>
          </select>
          <input
            placeholder="Translate"
            onChange={(event) => setWord(event.target.value)}
          />
        </div>
        <div className="container">
          <select onChange={(event) => setTo(event.target.value)}>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="ar">Arabic</option>
            <option value="tr">Turkish</option>
          </select>
          <div className="output">{translation}</div>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}
export default App;
