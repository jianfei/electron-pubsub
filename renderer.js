const { ipcRenderer } = require('electron');
const _ = require('lodash');

const pushEvent = '__PUBSUB_PUSH__';

function subscribe(eventName, callback) {
    ipcRenderer.on(eventName, callback);
}

function once(eventName, callback) {
    ipcRenderer.once(eventName, callback);
}

function unsubscribe(eventName, callback) {
    if (callback) {
        ipcRenderer.removeListener(eventName, callback);
    }
    else {
        ipcRenderer.removeAllListeners(eventName);
    }
}

function publish(eventName, ...args) {
    ipcRenderer.send(eventName, ...args);
    ipcRenderer.send(pushEvent, eventName, ...args);
}

module.exports = {
    subscribe,
    once,
    unsubscribe,
    publish,
};
