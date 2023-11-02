import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [image, setImage] = useState(""); // set as blank for now, but will try and do a background image

  async function handleTranslate(event) {
    event.preventDefault();
    const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    const APIPIC = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${res.data.responseData.translatedText}`;
    const resAPIPIC = await axios.get(APIPIC);

    setTranslation(res.data.translation);
    setImage(resAPIPIC.data.results[0].urls.regular);
  }

  return (
    <>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${image})` }}
      />
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
