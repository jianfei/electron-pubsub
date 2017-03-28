const isMainProcess = process.type === 'browser';

let pubsub;

if (isMainProcess) {
    pubsub = require('./pubsub');
} else {
    const { remote } = require('electron');
    pubsub = remote.require(`${__dirname}/pubsub`);
}

module.exports = pubsub;