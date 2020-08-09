'use strict';
const {promisify} = require('util');
const path = require('path');
const childProcess = require('child_process');

const execFile = promisify(childProcess.execFile);

// Binary source → https://github.com/sindresorhus/win-wallpaper
const binary = path.join(path.resolve(), 'node_modules/wallpaper/source/win-wallpaper.exe')
	.replace(/\b(\w*main\w*)\b/g, 'renderer')
	.replace('/..', '');

exports.get = async () => {
	const {stdout} = await execFile(binary);
	return stdout.trim();
};

exports.set = async imagePath => {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	await execFile(binary, [path.resolve(imagePath)]);
};
