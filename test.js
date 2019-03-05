'use strict';

const {execFile} = require('child_process');
const {join} = require('path');
const {promisify} = require('util');
const {unlink, writeFile} = require('fs').promises;

Object.defineProperties(process.stdout, {
	isTTY: {
		value: true
	},
	columns: {
		value: 10
	}
});

const ttyWidthFrame = require('.');
const test = require('tape');

test('ttyWidthFrame()', async t => {
	const contentWidth = process.stdout.columns - '  ┌'.length - '┐  '.length;
	const lines = ttyWidthFrame('A\nB').split('\n');

	t.equal(
		lines.shift(),
		`  ┌${'─'.repeat(contentWidth)}┐`,
		'should starts with an upper frame.'
	);

	t.equal(
		lines.shift(),
		`  │${' '.repeat(contentWidth)}│`,
		'should add 1 vertical padding to the top of contents.'
	);

	t.equal(
		lines.shift(),
		`  │ A${' '.repeat(contentWidth - ' A'.length)}│`,
		'should add 1 horizontal padding to both ends of each line.'
	);

	t.equal(
		lines.shift(),
		`  │ B${' '.repeat(contentWidth - ' B'.length)}│`,
		'should support multiline contents.'
	);

	t.equal(
		lines.shift(),
		`  │${' '.repeat(contentWidth)}│`,
		'should add 1 vertical padding to the bottom of contents.'
	);

	t.equal(
		lines.shift(),
		`  └${'─'.repeat(contentWidth)}┘`,
		'should starts with an lower frame.'
	);

	t.throws(
		() => ttyWidthFrame(Buffer.from('a')),
		/TypeError.*Expected a string to be framed with box-drawing characters, but got <Buffer 61>\./u,
		'should throw an error when it takes a non-string argument.'
	);

	const tmp = join(__dirname, 'tmp.js');

	await writeFile(tmp, 'try {require(".")()} catch ({message}) {console.error(message)}');

	t.equal(
		(await promisify(execFile)('node', [tmp])).stderr.replace(/\n$/u, ''),
		'tty-width-frame only supports TTY environments, but the program is running under a non-TTY environment.',
		'should throw an error when it\'s run in a non-TTY environment.'
	);

	await unlink(tmp);

	t.throws(
		() => ttyWidthFrame(),
		/^RangeError.*Expected 1 argument \(<string>\), but got no arguments\./u,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => ttyWidthFrame('a', 'b'),
		/^RangeError.*Expected 1 argument \(<string>\), but got 2 arguments\./u,
		'should throw an error when it takes too many arguments.'
	);

	t.end();
});
