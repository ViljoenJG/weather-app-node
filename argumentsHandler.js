const yargs = require('yargs');
const argsArr = getArgumentsArray();

module.exports.argumentsString =
    argsArr.reduce((prev, cur) => prev ? `${ prev }%20${ cur }` : cur, '');

function getArgumentsArray() {
    const argv = yargs
        .demand(1)
        .argv;

    return argv._;
}