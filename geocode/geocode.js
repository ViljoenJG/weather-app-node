const request = require('request');
const { promisify } = require('util');
const httpRequest = promisify(request);

const config = require('../conf/config');

function geocodeAddress(address) {
    return httpRequest({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address,
        json: true
    })
    .then(handleGeocodeRequest)
    .catch(handleRequestError)
}

function getWeatherForLocation(coords) {
    const url = `https://api.darksky.net/forecast/` +
        `${ config.apiKey }/${ coords.latitude },${ coords.longitude }?units=si`;

    return httpRequest({
        url,
        json: true
    })
    .then(handleWeatherRequest)
    .catch(handleRequestError)
}

function handleGeocodeRequest(resp) {
    if (resp.body.status !== 'OK') {
        return {error: 'No results found for the address provided.'};
    }

    const result = resp.body.results[0];

    return {
        address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
    };
}

function handleRequestError(error) {
    const error = 'An error occurred when trying to retrieve data. ' +
        'Please confirm that you have internet connectivity.';

    return {error};
}

function handleWeatherRequest(resp) {
    return resp.body.currently
        ? resp.body.currently
        : resp.body;
}

module.exports = {
    geocodeAddress,
    getWeatherForLocation
};