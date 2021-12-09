import {minBy} from "lodash/math";

const weatherApiBaseUrl = 'https://www.metaweather.com';

export const fetchIconUrl = (weatherIconAbbr) => `${weatherApiBaseUrl}/static/img/weather/${weatherIconAbbr}.svg`;

export const fetchLocationLatLong = () => fetch('https://geolocation-db.com/json/').then(data => data.json());

export const fetchLocation = (latitude, longitude) => fetch(`${weatherApiBaseUrl}/api/location/search/?lattlong=${latitude},${longitude}`)
  .then(data => {
    return data.json();
  }).then(locations => {
    return minBy(locations, 'distance').woeid;
  });

export const fetchWeatherDetails = (woeid) => fetch(`${weatherApiBaseUrl}/api/location/${woeid}/`).then(data => data.json());