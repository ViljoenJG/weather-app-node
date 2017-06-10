const request = require('request');
const { promisify } = require('util');
const httpRequest = promisify(request);

const config = require('../conf/config');

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
    getWeatherForLocation
};