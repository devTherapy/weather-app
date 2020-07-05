const request = require("request");

const geocode = (address, callback) => {
  if (address === undefined) {
    return;
  }
  const url = ` https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGh5c2lvZGV2IiwiYSI6ImNrYnk0dnZ0NTB3aWYyenA3MzFrbHp5MGUifQ.IEk2LL0YBWV8wxSHEZsVHw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback(
        "cannot find specified location. Try another location",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
