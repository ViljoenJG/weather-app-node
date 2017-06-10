const request = require('request');
const { promisify } = require('util');
const requestAsync = promisify(request);

function geocodeAddress(address) {
    const cfg = {
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address,
        json: true
    };

    return requestAsync(cfg)
        .then(handleRequest)
        .catch(handleRequestError)
}

function handleRequest(resp) {
    if (resp.body.status !== 'OK') {
        return 'No results found for the address provided.';
    }

    const result = resp.body.results[0];
    return `Address: ${ result.formatted_address }\n` +
        `Latitude: ${ result.geometry.location.lat }\n` +
        `Longitude: ${ result.geometry.location.lng }`;
}

function handleRequestError(error) {
    return 'An error occurred when trying to retrieve data. ' +
        'Please confirm that you have internet connectivity.';
}

module.exports = {
    geocodeAddress
};