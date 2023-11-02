const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

app.get("/", (_, response) => response.json("Root route for translatim"));

// add your endpoints here
// copy and past query here
app.get("/translate", async (request, response) => {
  // from the client to the server
  //word to from
  // const word = request.query.word;
  // const from = request.query.from;
  // const to = request.query.to;

  const { word, from, to } = request.query;

  // Make API call always use back ticks
  const API = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`; // test in server
  const res = await axios.get(API);

  const wrangledData = {
    translation: res.data.responseData.translatedText,
    match: res.data.responseData.match,
  };

  response.json(wrangledData); // this tests the code http://localhost:8080/translate?word=hello&from=en&to=es
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
