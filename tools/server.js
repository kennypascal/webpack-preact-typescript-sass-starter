const env = './build';
const chalk = require('chalk');
const express = require('express');
const server = express(); 
const port = Number(require('../package.json').config.port ? require('../package.json').config.port : 3000) + 1;

server.use(express.static(env));
server.listen(port);

console.log(chalk.black.bgMagenta('                              '));
console.log(chalk.black.bgMagenta(`     Serving: ${env}         `));
console.log(chalk.black.bgMagenta(`     http://localhost:${port}    `));
console.log(chalk.black.bgMagenta('                              '));
console.log('\n');
