const isMainProcess = process.type === 'browser';
const pubsub = require(isMainProcess ? './main.js' : './renderer.js');

module.exports = pubsub;