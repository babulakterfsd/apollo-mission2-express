const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const http = require('http');
const server = http.createServer();
const fs = require('fs');

// event
// eventEmitter.on('tutorial', (num1, num2) => {
//     console.log(num1 + num2);
// });

// eventEmitter.on('tutorial', () => {
//     setTimeout(() => {
//         console.log('tutorial event has occurred');
//     }, 3000);
// });

// eventEmitter.emit('tutorial', 1, 2);

//server
server.on('request', (req, res) => {
    if(req.url === '/' && req.method === 'GET') {
        const readableStream = fs.createReadStream(process.cwd() + '/readblefile.txt');

        readableStream.on('data', (buffer) => {
           res.write(buffer);
        });

        readableStream.on('end', () => {
            res.end();
        });
    }
});

server.listen(5000, () => {
    console.log('nodejs server is running');
});