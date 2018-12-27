#!/usr/bin/env node
const program = require('commander');

const { version } = require('../package.json');

program.version(version, '-v, --version');

program.command('generate [type]', 'generates file structure').alias('g');

program.parse(process.argv);
