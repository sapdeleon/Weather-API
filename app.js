const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Open Weather API Setup - to execute - apikey is required.
app.post("/", function (req, res) {
  const apiKey = "need to hide the API key...";
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.set("content-type", "text/html");
      res.write("<p>Temperature in " + query + " : " + temp + " degrees.</p>");
      res.write("<p>Weather Description: " + weatherDescription + "</p>");
      res.write("<img src='" + imageURL + "'/>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});
