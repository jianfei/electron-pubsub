# electron-pubsub

Pubsub for Electron.

We only support asynchronous publication. The reason behind is we are using IPC for communication between different processes and it doesn't support synchronous commuication. Check this issue: [Synchronous communication from main process to renderer process](https://github.com/electron/electron/issues/5750)

The arguments passed in will be converted to JSON during IPC communication. As a result, functions will be converted to null. So do not pass functions in arguments.

You can use it both in main and renderer process.

## Usage

### Initialization

```javascript
// in your main process
const pubsub = require('electron-pubsub');
pubsub.init();
```
You must initialize pubsub in main progress before using it. Otherwise the messages will not passed between different processes as expected.

### Subscribe

```javascript
// in any process
const pubsub = require('electron-pubsub');

pubsub.subscribe('myTopic', (event, ...args) => {
    // do something here.
});

pubsub.once('anotherTopic', someCallback);
```

### Publish

```javascript
// in any process
pubsub.publish('myTopic', 'some arguments');
```

### Unsubscribe

```javascript
// in any process
pubsub.unsubscribe('myTopic', someCallback);
pubsub.unsubscribe('myTopic');
```

## TODO

- Support hierarchy of topics.