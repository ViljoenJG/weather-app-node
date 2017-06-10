const fs = require('fs');

let key = fs.readFileSync(__dirname + '/api-key.txt', 'utf-8');
if (!key) {
    console.log('No API key defined in api-key.txt. Create account at https://darksky.net to get a key')
    key = 'no-key'
}

console.log(key);

module.exports = {
    apiKey: key
};