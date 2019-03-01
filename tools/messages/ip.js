const ip = require('ip')
const chalk = require('chalk')
const port = require('../../package.json').config.port
const local = '  http://localhost:' + port
const extarnal = '  http://' + ip.address() + ':' + port

function fill(string) {
	var filler = ''
	while (filler.length + string.length < 30) {
		filler += ' '
	}
	return filler
}

console.log(chalk('\n                                         '))
console.log(chalk.black.bgMagenta('                              '))
console.log(chalk.black.bgMagenta(local + fill(local)))
console.log(chalk.black.bgMagenta(extarnal + fill(extarnal)))
console.log(chalk.black.bgMagenta('                              '))
console.log('\n')
