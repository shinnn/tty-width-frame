'use strict';

const inspectWithKind = require('inspect-with-kind');
const stringWidth = require('string-width');
const wrapAnsi = require('wrap-ansi');

const wrapAnsiOption = {hard: true};

module.exports = process.stdout && process.stdout.isTTY ? function ttyWidthFrame(...args) {
	const argLen = args.length;

	if (argLen !== 1) {
		throw new RangeError(`Expected 1 argument (<string>), but got ${
			argLen === 0 ? 'no' : argLen
		} arguments.`);
	}

	const [str] = args;

	if (typeof str !== 'string') {
		throw new TypeError(`Expected a string to be framed with box-drawing characters, but got ${
			inspectWithKind(str)
		}.`);
	}

	const {columns} = process.stdout;

	if (columns < 15) {
		return str;
	}

	// '  ┌'.length + '┐  '.length === 6
	const contentWidth = columns - 6;

	const padding = `  │${' '.repeat(contentWidth)}│`;
	const verticalBar = '─'.repeat(contentWidth);

	return `  ┌${verticalBar}┐
${padding}
${wrapAnsi(str, contentWidth - 2, wrapAnsiOption).split(/\r?\n/u).map(line => `  │ ${line}${
		' '.repeat(Math.max(contentWidth - 2 - stringWidth(line), 0))
	} │`).join('\n')}
${padding}
  └${verticalBar}┘`;
} : function unsupported() {
	const error = new Error('tty-width-frame only supports TTY environments, but the program is running under a non-TTY environment.');
	error.code = 'ERR_NO_TTY';

	throw error;
};
