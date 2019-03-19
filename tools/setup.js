const { DEFAULT_PACKAGE_NAME, DEFAULT_PACKAGE_TITLE } = require('./constants/default');

const replace = require('replace');
const chalk = require('chalk');
const chalkPrompt = chalk.white;
const chalkDelimiter = chalk.grey;
const chalkDescription = chalk.yellow;
const chalkMessage = chalk.red;
const chalkSuccess = chalk.green;
const chalkProcessing = chalk.cyan;
const prompt = require('prompt');

prompt.message = chalkPrompt('>');
prompt.delimiter = chalkDelimiter(':');
const prompts = [
	{
		name: 'projectName',
		description: chalkPrompt('Project Name') + chalkDescription(` (default: ${DEFAULT_PACKAGE_NAME})`),
		pattern: /^[^._][a-z0-9-_~]+$/,
		message: chalkMessage('Limited to: lowercase letters, numbers, period, hyphen, ' + 'underscore, and tilde; cannot begin with period or underscore.')
	},
	{
		name: 'projectTitle',
		description: chalkPrompt('Project Title') + chalkDescription(` (default: ${DEFAULT_PACKAGE_TITLE})`),
	},
	{
		name: 'version',
		description: chalkPrompt('Version') + chalkDescription(' (default: 0.1.0)')
	},
	{
		name: 'author',
		description: chalkPrompt('Author')
	},
	{
		name: 'license',
		description: chalkPrompt('License') + chalkDescription(' (default: MIT)')
	},
	{
		name: 'description',
		description: chalkPrompt('Description')
	}
];

prompt.start();

console.log(chalkProcessing('\n\nUpdating package.json settings...'));

prompt.get(prompts, function(err, result) {
	const responses = [
		{
			key: 'name',
			value: result.projectName || DEFAULT_PACKAGE_NAME
		},
		{
			key: 'title',
			value: result.projectTitle || DEFAULT_PACKAGE_TITLE
		},
		{
			key: 'version',
			value: result.version || '0.1.0'
		},
		{
			key: 'author',
			value: result.author
		},
		{
			key: 'license',
			value: result.license || 'MIT'
		},
		{
			key: 'description',
			value: result.description
		}
	];

	responses.forEach((res) => {
		replace({
			regex: `("${res.key}"): "(.*?)"`,
			replacement: `$1: "${res.value}"`,
			paths: ['package.json'],
			recursive: false,
			silent: true
		});
	});

	replace({
		regex: /"keywords": \[[\s\S]+?\]/,
		replacement: `"keywords": []`,
		paths: ['package.json'],
		recursive: false,
		silent: true
	});

	console.log('\n\n' + chalkSuccess('✔ ') + 'Setup Complete\n\n');
});
