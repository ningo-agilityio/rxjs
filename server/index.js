const express = require("express");
const fetch = require('node-fetch');
var cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());


// Add your keys
const keys = {
  //https://developers.google.com/places/web-service/intro
  googleMaps : "YOUR KEY GOES HERE",
  //https://darksky.net/dev
  darkSky : "YOUR KEY GOES HERE"
};