#!/usr/bin/env node
const { argv } = require('./argumentsHandler');
const geocode = require('./geocode/geocode');
const config = require('./conf/config');

const address = encodeURIComponent(argv.address);
geocode.geocodeAddress(address)
    .then(detail => console.log(JSON.stringify(detail, undefined, 2)));
