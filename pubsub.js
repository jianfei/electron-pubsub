const Emitter = require('events');

const __EMITTER__ = new Emitter();

function subscribe(eventName, ...args) {
    __EMITTER__.on(eventName, ...args);
}

function once(eventName, ...args) {
    __EMITTER__.once(eventName, ...args);
}

function unsubscribe(eventName, ...args) {
    if (isHierarchical(eventName)) {
        __EMITTER__.eventNames().forEach((name) => {
            if (matchHierarchicalName(eventName, name)) {
                console.log(name);
                __EMITTER__.removeListener(name, ...args);
            }
        });
    } else {
        __EMITTER__.removeListener(eventName, ...args);
    }
}

function publish(eventName, ...args) {
    return new Promise((resolve, reject) => {
        const event = {
            name: eventName,
            resolve,
            reject,
        };

        if (isHierarchical(eventName)) {
            getHierarchicalNames(eventName).forEach((name) => {
                __EMITTER__.emit(name, event, ...args);
            });
        } else {
            __EMITTER__.emit(eventName, event, ...args);
        }
    });
}

function clearAllSubscriptions() {
    __EMITTER__.removeAllListeners();
}

function isHierarchical(value) {
    return value.split('.').length > 1;
}

function getHierarchicalNames(value) {
    const tokens = value.split('.');
    let temp = '';

    return value.split('.').map((token ,index) => temp += (index ? '.' : '') + token).reverse();
}

function matchHierarchicalName(eventName, compareName) {
    return compareName === eventName || compareName.startsWith(`${eventName}.`);
}

module.exports = {
    subscribe,
    once,
    unsubscribe,
    publish,
    clearAllSubscriptions,
};
