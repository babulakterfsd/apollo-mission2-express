import 'colors';
import { Server } from 'http';
import app, { port } from './app';

let server: Server;

async function main() {
  server = app.listen(port, () => {
    console.log(`Server started on port ${port}`.rainbow.bgBlack.bold);
  });
}

main();
