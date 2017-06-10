#!/usr/bin/env node
const { argv } = require('./argumentsHandler');
const geocode = require('./geocode/geocode');

const address = encodeURIComponent(argv.address);
geocode.geocodeAddress(address).then(detail => console.log(detail));
