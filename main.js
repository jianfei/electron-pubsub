const Emitter = require('events');
const { ipcMain, BrowserWindow } = require('electron');

const emitter = new Emitter();
const pushEvent = '__PUBSUB_PUSH__';

function prefix(eventName) {
    return `__PUBSUB__${eventName}`;
}

function broadcast(eventName, ...args) {
    BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send(eventName, ...args);
    });
}

function init() {
    ipcMain.on(pushEvent, (event, eventName, ...args) => {
        broadcast(eventName, ...args);
    });
}

function subscribe(eventName, callback) {
    emitter.on(prefix(eventName), callback);
    ipcMain.on(prefix(eventName), callback);
}

function once(eventName, callback) {
    emitter.once(prefix(eventName), callback);
    ipcMain.once(prefix(eventName), callback);
}

function unsubscribe(eventName, callback) {
    if (callback) {
        emitter.removeListener(prefix(eventName), callback);
        ipcMain.removeListener(prefix(eventName), callback);
    } else {
        emitter.removeAllListeners(prefix(eventName));
        ipcMain.removeAllListeners(prefix(eventName));
    }
}

function publish(eventName, ...args) {
    emitter.emit(prefix(eventName), ...args);
    broadcast(prefix(eventName), ...args);
}

module.exports = {
    init,
    subscribe,
    once,
    unsubscribe,
    publish,
};
