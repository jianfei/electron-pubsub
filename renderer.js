const { ipcRenderer } = require('electron');

const pushEvent = '__PUBSUB_PUSH__';

function prefix(eventName) {
    return `__PUBSUB__${eventName}`;
}

function subscribe(eventName, callback) {
    ipcRenderer.on(prefix(eventName), callback);
}

function once(eventName, callback) {
    ipcRenderer.once(prefix(eventName), callback);
}

function unsubscribe(eventName, callback) {
    if (callback) {
        ipcRenderer.removeListener(prefix(eventName), callback);
    } else {
        ipcRenderer.removeAllListeners(prefix(eventName));
    }
}

function publish(eventName, ...args) {
    ipcRenderer.send(prefix(eventName), ...args);
    ipcRenderer.send(pushEvent, prefix(eventName), ...args);
}

module.exports = {
    subscribe,
    once,
    unsubscribe,
    publish,
};
