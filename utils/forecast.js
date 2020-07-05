const request = require("request");
const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1ae85970c9f69d44e03e7a5d666ec40b&query=${longitude},${latitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to url", undefined);
    } else if (body.success === false) {
      callback("unable to retrieve weather data for specified location.");
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        region: body.location.region,
        country: body.location.country,
      });
    }
  });
};
module.exports = forecast;
