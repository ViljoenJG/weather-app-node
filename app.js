#!/usr/bin/env node
const request = require('request');
const { address } = require('./argumentsHandler');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address,
    json: true
}, handleRequest);

function handleRequest(error, {body}) {
    if (error) throw  error;

    const result = body.results[0];

    console.log(`Address: ${ result.formatted_address }`);
    console.log(`Latitude: ${ result.geometry.location.lat }\nLongitude: ${ result.geometry.location.lng }`);
}