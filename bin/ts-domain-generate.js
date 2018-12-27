const program = require('commander');

program
  .command('entity', 'generates a entity file')
  .alias('e')
  .command('repository', 'generates a repository')
  .alias('r')
  .command('service', 'generates a service')
  .alias('s')
  .command('use-case', 'generates a use case')
  .alias('case')
  .parse(process.argv);
