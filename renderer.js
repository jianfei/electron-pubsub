const { ipcRenderer } = require('electron');
const _ = require('lodash');

const pubsubEventName = '__PUBSUB_EVENT__';

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
    let promise = new Promise((resolve, reject) => {
        ipcRenderer.send(eventName, { resolve, reject }, ...args);
        ipcRenderer.send(pubsubEventName, eventName, { resolve, reject }, ...args);
    });
}

module.exports = {
    subscribe,
    once,
    unsubscribe,
    publish,
};
