const program = require('commander');

program
  .command('entity <name>', 'generates a entity file')
  .alias('e')
  .command('repository <name>', 'generates a repository')
  .alias('r')
  // .command('service <name>', 'generates a service')
  // .alias('s')
  // .command('use-case <name>', 'generates a use case')
  .alias('case')
  .parse(process.argv);
