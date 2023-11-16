const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial', (num1, num2) => {
    console.log(num1 + num2);
});

eventEmitter.on('tutorial', () => {
    setTimeout(() => {
        console.log('tutorial event has occurred');
    }, 3000);
});

eventEmitter.emit('tutorial', 1, 2);