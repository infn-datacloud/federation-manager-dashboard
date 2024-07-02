import sonarjs from "eslint-plugin-sonarjs";

[
	sonarjs.configs.recommended,
	{
		"plugins": {
			sonarjs,
		}
	}
];

const pluginSecurity = require('eslint-plugin-security');

module.exports = [pluginSecurity.configs.recommended];