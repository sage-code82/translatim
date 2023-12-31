const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

app.get("/", (_, response) => response.json("Root route for translatim"));

app.get("/translate", async (request, response) => {
  const { word, from, to } = request.query;

  const API = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
  const res = await axios.get(API);
  const APIPIC = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${word}`; // changing translatedText to word to see if that fixes the pciture error
  const resAPIPIC = await axios.get(APIPIC);
  console.log(APIPIC);

  const wrangledData = {
    translation: res.data.responseData.translatedText,
    match: res.data.responseData.match,
    img_url: resAPIPIC.data.results[0].urls.regular,
  };

  response.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
