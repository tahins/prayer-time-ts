import geolocator from "geolocator";

export default class LocationService {
  constructor() {
    geolocator.config({
      language: "en",
      google: {
        version: "3",
        key: process.env.REACT_APP_GOOGLE_API_KEY
      }
    });
  }

  async getPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(position => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        // console.info("Position fetched", coords);
        resolve(coords);
      }, reject, options);
    });
  }

  async getPlace() {
    return await fetch("https://geoip-db.com/json/")
      .then(response => response.json())
      .then(function (jsonResponse) {
        let location = {
          city: jsonResponse.city,
          country: jsonResponse.country_name
        };
        // console.info("Location fetched", location);
        return location;
      });
  }

  _getLocation() {
    const options = {
      enableHighAccuracy: true,
      fallbackToIP: true,
      addressLookup: true
    };

    return new Promise((resolve, reject) => {
      geolocator.locate(options, (error, location) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          city: location.address.city,
          country: location.address.country,
          coords: location.coords
        });
      });
    });
  }
}
