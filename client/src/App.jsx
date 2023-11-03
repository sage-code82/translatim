import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [img_url, setImage] = useState(""); // set as blank for now, but will try and do a background image

  async function handleTranslate(event) {
    event.preventDefault();
    const API = `https://translatim-rhsp.onrender.com/translate?word=${word}&from=${from}&to=${to}`; // swap with my onrender link
    // const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    setTranslation(res.data.translation);
    setImage(res.data.img_url); // was I overthinking do I only need this line?
  }

  return (
    <>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${img_url})` }}
      />
      <h1>Now Thats What I Call A Translator</h1>
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
