#!/usr/bin/env node
const { argv } = require('./argumentsHandler');
const axios = require('axios');
const config = require('./conf/config');

const address = encodeURIComponent(argv.address);

getGeoDataForAddress(address)
    .then(handleGeocodeRequest)
    .then(getWeatherForLocation)
    .then(handleWeatherRequest)
    .then(printWeatherData)
    .catch(handleError);


/**************************
 *        methods
 **************************/

function getGeoDataForAddress(address) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;
    return axios.get(url).catch(() => Promise.reject('geoDataReq'));
}

function handleGeocodeRequest(resp) {
    if (resp.data.status !== 'OK') {
        return Promise.reject('geoData');
    }

    const result = resp.data.results[0];

    return {
        address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
    };
}

function getWeatherForLocation(coords) {
    console.log(`Weather for: ${ coords.address }`);

    const url = `https://api.darksky.net/forecast/` +
        `${ config.apiKey }/${ coords.latitude },${ coords.longitude }?units=si`;

    return axios.get(url).catch(err => Promise.reject('weatherReq'));
}


function handleWeatherRequest(resp) {
    if (resp.data.error) {
        return Promise.reject('weather')
    }

    return resp.data.currently;
}

function handleError(step) {

    if (step === 'geoDataReq') {
        console.log('An error occurred while getting location data. ' +
            'Please confirm you have internet connectivity.')

    } else if (step === 'geoData') {
        console.log('No results found for the address provided. ' +
            'Please confirm that the address is valid.')

    } else if (step === 'weatherReq') {
        console.log('An error occurred while retrieving weather data. ' +
            'Please confirm you have internet connectivity')

    } else if (step === 'weather') {
        console.log('Unable to get weather data for the address provided.')
    }
}

function printWeatherData(resp) {
    console.log(`Temperature: ${ resp.temperature }\u02DAC`);
    console.log(`Feels like: ${ resp.apparentTemperature }\u02DAC`);
    console.log(`Wind Speed: ${ resp.windSpeed }km/h`);
    console.log(`Change for precipitation: ${ resp.precipProbability }%`)
}
