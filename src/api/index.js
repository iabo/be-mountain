const debug = require('debug')('app:http-server');
const http = require('http');
const chalk = require('chalk');
const App = require('./app');

// // Getting environment variables
// const HOST = process.env.SERVICE_HOST || '0.0.0.0';
// const PORT = process.env.SERVICE_PORT || 3000;

// // Server
// const httpServer = http.createServer(App.callback());

// function listenAsync(port, host) {
//   return new Promise(function asyncResolve(resolve) {
//     httpServer.listen(port, host, function callback() {
//       return resolve();
//     });
//   });
// }

// // Listen
// listenAsync(PORT, HOST).then(() => {
//   debug('%s Backend service running at http://%s:%d', chalk.green('✓'), HOST, PORT);
//   debug('  CTRL-C to end the process\n');
//   if (!process.env.NODE_APP_INSTANCE || process.env.NODE_APP_INSTANCE === '0') { // Master node.

//   }
// }).catch((error) => {
//   debug('Error', error);
// });
