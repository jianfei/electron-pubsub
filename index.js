const is = require('electron-is');
const pubsub = require(is.main() ? './main.js' : './renderer.js');

module.exports = pubsub;