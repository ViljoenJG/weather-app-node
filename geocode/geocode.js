const request = require('request');
const { promisify } = require('util');
const httpRequest = promisify(request);

function geocodeAddress(address) {
    return httpRequest({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address,
        json: true
    })
    .then(handleGeocodeRequest)
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

module.exports = {
    geocodeAddress,
};