#!/usr/bin/env node
const { argv } = require('./argumentsHandler');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const address = encodeURIComponent(argv.address);
geocode.geocodeAddress(address)
    .then(getWeatherForLocation)
    .then(printWeatherData);


function getWeatherForLocation(coords) {
    if (coords.error) {
        return console.log(coords.error)
    }

    console.log(`Weather for: ${ coords.address }`);

    return weather
        .getWeatherForLocation(coords)
}

function printWeatherData(resp) {
    if (resp.error) {
        return console.log(resp.error);
    }

    console.log(`Temperature: ${ resp.temperature }\u02DAC`);
    console.log(`Feels like: ${ resp.apparentTemperature }\u02DAC`);
    console.log(`Wind Speed: ${ resp.windSpeed }km/h`);
    console.log(`Change for precipitation: ${ resp.precipProbability }%`)
}

