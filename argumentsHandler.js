const yargs = require('yargs');

const address = {
    demand: true,
    alias: 'a',
    describe: 'Retrieve weather for this address.',
    string: true
};

const argv = getArguments();

module.exports = {
    argv
};

function getArguments() {
    return yargs
        .options({address})
        .help()
        .alias('help', 'h')
        .argv;
}