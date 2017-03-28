const Emitter = require('events');

const __EMITTER__ = new Emitter();

function subscribe(...args) {
    __EMITTER__.on(...args);
}

function once(...args) {
    __EMITTER__.once(...args);
}

function unsubscribe(...args) {
    __EMITTER__.removeListener(...args);
}

function publish(eventName, ...args) {
    return new Promise((resolve, reject) => {
        const event = {
            resolve,
            reject,
        };

        __EMITTER__.emit(eventName, event, ...args);
    });
}

function clearAllSubscriptions() {
    __EMITTER__.removeAllListeners();
}

module.exports = {
    subscribe,
    once,
    unsubscribe,
    publish,
    clearAllSubscriptions,
};
