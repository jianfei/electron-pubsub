const Emitter = require('events');
const { ipcMain, BrowserWindow } = require('electron');
const _ = require('lodash');

const emitter = new Emitter();
const pushEvent = '__PUBSUB_PUSH__';

ipcMain.on(pushEvent, (event, eventName, ...args) => {
    broadcast(eventName, ...args);
});

function subscribe(eventName, callback) {
    emitter.on(eventName, callback);
    ipcMain.on(eventName, callback);
}

function once(eventName, callback) {
    emitter.once(eventName, callback);
    ipcMain.once(eventName, callback);
}

function unsubscribe(eventName, callback) {
    if (callback) {
        emitter.removeListener(eventName, callback);
        ipcMain.removeListener(eventName, callback);
    }
    else {
        emitter.removeAllListeners(eventName);
        ipcMain.removeAllListeners(eventName);
    }
}

function publish(eventName, ...args) {
    emitter.emit(eventName, ...args);
    broadcast(eventName, ...args);
}

function broadcast(eventName, ...args) {
    _.each(BrowserWindow.getAllWindows(), (win) => {
        win.webContents.send(eventName, ...args);
    });
}

module.exports = {
    subscribe,
    once,
    unsubscribe,
    publish,
};