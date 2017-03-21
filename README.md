# electron-pubsub

Pubsub for Electron.

We only support asynchronous publication. The reason is we are using IPC for communication between different processes and it doesn't support synchronous commuication. Check this issue: [Synchronous communication from main process to renderer process](https://github.com/electron/electron/issues/5750)

Functions are not allowed in arguments because they will be converted to JSON in IPC communication. I am still working it out.

You can use it both in main and renderer process.

## Usage
```javascript
const { subscribe, once, unsubscribe, publish} = require('electron-pubsub');

subscribe('a', (event, ...args) => {
    // do something here.
});

once('b', (event, ...args) => {
    // do something here.
});

unsubscribe('c', someCallback);

unsubscribe('d');

// in some other process
publish('a', 'some arguments');
```

## TODO

- Support topics
- Allow functions to be passed
- Change event name used to avoid conflicts
