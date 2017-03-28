# electron-pubsub

Pubsub for Electron.

You can use it in main or renderer process.

## Usage

### Initialization

```
npm install --save electron-pubsub
```

### Subscribe

```javascript
// in main or renderer process
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

pubsub.clearAllSubscriptions();
```

### Hierarchical addressing

```javascript
pubsub.subscribe('a', myFunc1);
pubsub.subscribe('a.b', myFunc2);
pubsub.subscribe('a.b.c', myFunc3);

pubsub.unsubscribe('a.b');
```

### Use promises

```javascript
pubsub.publish('myTopic', 'some arguments')
    .then(onSuccess)
    .catch(onFailure);

pubsub.subscribe('myTopic', (event, ...args) => {
    event.resolve('success!');
});
```

## TODO

- Support hierarchy of topics.