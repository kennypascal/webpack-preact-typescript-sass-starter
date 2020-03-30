/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const chalk = require('chalk');
const static = require('node-static');

const env = './build';
const file = new static.Server(env);

const port = Number(require('../package.json').config.port ? require('../package.json').config.port : 3000) + 1;

require('http')
  .createServer((request, response) => {
    request
      .addListener('end', () => {
        file.serve(request, response);
      })
      .resume();
  })
  .listen(port);

console.log(chalk.black.bgMagenta('                              '));
console.log(chalk.black.bgMagenta(`     Serving: ${env}         `));
console.log(chalk.black.bgMagenta(`     http://localhost:${port}    `));
console.log(chalk.black.bgMagenta('                              '));
console.log('\n');
