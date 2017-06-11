#!/usr/bin/env node
const { argv } = require('./argumentsHandler');
const axios = require('axios');
const config = require('./conf/config');

const address = encodeURIComponent(argv.address);

axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
    .then(handleGeocodeRequest)
    .then(getWeatherForLocation)
    .then(handleWeatherRequest)
    .then(printWeatherData)
    .catch(handleError);


/**************************
 *        methods
 **************************/

function handleGeocodeRequest(resp) {
    if (resp.data.status !== 'OK') {
        return {error: 'No results found for the address provided.'};
    }

    const result = resp.data.results[0];

    return {
        address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
    };
}

function getWeatherForLocation(coords) {
    if (coords.error) {
        return console.log(coords.error)
    }

    console.log(`Weather for: ${ coords.address }`);

    const url = `https://api.darksky.net/forecast/` +
        `${ config.apiKey }/${ coords.latitude },${ coords.longitude }?units=si`;

    return axios.get(url)
}


function handleWeatherRequest(resp) {
    return resp.data.currently
        ? resp.data.currently
        : resp.data;
}

function handleError() {
    console.log('An error occurred. Please confirm that you have internet connectivity and that the address is valid.')
}

function printWeatherData(resp) {
    if (resp.error) {
        return console.log(resp.data.error);
    }

    console.log(`Temperature: ${ resp.temperature }\u02DAC`);
    console.log(`Feels like: ${ resp.apparentTemperature }\u02DAC`);
    console.log(`Wind Speed: ${ resp.windSpeed }km/h`);
    console.log(`Change for precipitation: ${ resp.precipProbability }%`)
}
