const express = require("express");
const fetch = require('node-fetch');
var cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
require('dotenv').config()
const mockAutoCompletePlaces = require("./mock-autocomplete.json")
const mockPlaceDetail = require("./mock-placedetails.json")

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

// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=danang&language=en&sessiontoken=2bafebf9-1058-4510-aa0f-998038941a4b&key=AIzaSyCd1TiNeosvQfoRibNNEYLbI_Q_QwfsMlA
app.get("/autocomplete/:id", (req, res) => {
  googleMapsClient.placesAutoComplete(
    {
      input: req.params.id,
      language: "en",
      sessiontoken: token
    },
    (_, result) => {
      // TODO: will check real result later
      res.send(mockAutoCompletePlaces.predictions || []);
    }
  );
});

// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJEyolkscZQjERh2RDRKDjFPw&language=en&sessiontoken=2bafebf9-1058-4510-aa0f-998038941a4b&key=AIzaSyCd1TiNeosvQfoRibNNEYLbI_Q_QwfsMlA
app.get("/place/:id", (req, res) => {
  googleMapsClient.place(
    {
        placeid: req.params.id,
        language: 'en'
    },
    (_, result) => {
      // TODO: will check real result later
      res.send(mockPlaceDetail.result || {});
    }
  );
});



app.get("/weather/:lat/:long", (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.long}&appid=${keys.openWeather}`)
    .then(res => res.json())
    .then(json => res.json(json));
});

app.listen(port, () => console.log(`The Weather Server is running on ${port}!`));