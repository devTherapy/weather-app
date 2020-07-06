const request = require("request");
const geocode = require("../utils/geocoords");
const forecast = require("../utils/forecast");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
//setting paths for express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../Template/views");
const partialsPath = path.join(__dirname, "../Template/partials");
hbs.registerPartials(partialsPath);
const app = express();
const port = process.env.PORT || 3000;
//serving up static assets
app.use(express.static(publicPathDirectory));
//setting up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Folusayo Abe",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Folusayo",
    name: "Folusayo Abe",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Folusayo Abe",

    message: "How can we help you",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "you need to add an address",
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        res.send({
          address,
          location,
          forecast: forecastData,
        });
      });
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 error",
    name: "Folusayo Abe",
    error: "help Page not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 error",
    error: " Page not found",
    name: "Folusayo Abe",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
