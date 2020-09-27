const express = require("express");
const fetch = require('node-fetch');
var cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());


// Add your keys
const keys = {
  // https://developers.google.com/places/web-service/intro
  googleMaps : process.env.GOOGLE_MAP_API_KEY,
  // https://home.openweathermap.org/api_keys
  openWeather : process.env.OPEN_WEATHER_API_KEY
};

const googleMapsClient = require("@google/maps").createClient({
  key: keys.googleMaps
});
const util = require("@google/maps").util;

const token = util.placesAutoCompleteSessionToken();


app.get("/autocomplete/:id", (req, res) => {
  

  googleMapsClient.placesAutoComplete(
    {
      input: req.params.id,
      language: "en",
      sessiontoken: token
    },
    (_, result) => {
      res.send(result.json.predictions);
    }
  );
});

app.get("/place/:id", (req, res) => {
  googleMapsClient.place(
    {
        placeid: req.params.id,
        language: 'en'
    },
    (_, result) => {
        
      res.send(result.json.result);
    }
  );
});



app.get("/weather/:lat/:long", (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.long}&exclude=hourly,daily&appid=${keys.openWeather}`)
    .then(res => res.json())
    .then(json => res.json(json));
});

app.listen(port, () => console.log(`The Weather Server is running on ${port}!`));