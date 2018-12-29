import * as p from 'path';
import * as program from 'commander';

import { getDomainPath } from './helpers/getDomainPath';
import { exist } from './utils/fs';
import { isCorrectPath } from './helpers/isCorrectPath';
import { selectModule } from './helpers/selectModule';
import { askEntityName } from './helpers/askEntityName';

program
  .option('-d, --domain <path>', 'Enter domain path')
  .option('-m, --module <name>', 'Enter module name')
  .parse(process.argv);

let domainPath = program.domain;
let moduleName = program.module;
let entityName = program.args[0];
const rootPath = process.cwd();

const initialPath = domainPath ? Promise.resolve(domainPath) : getDomainPath();

initialPath
  .then(value => {
    if (domainPath) {
      return domainPath;
    }
    domainPath = value;
    return isCorrectPath({ path: domainPath });
  })
  .then(value => {
    domainPath = value;
    const fullPath = p.join(rootPath, domainPath);
    return exist({ path: fullPath });
  })
  .then(existDomainDir => {
    if (!existDomainDir) {
      throw new Error(`Domain path ${domainPath} doesn't exist`);
    }

    if (moduleName) {
      return moduleName;
    }
    const fullPath = p.join(rootPath, domainPath);
    return selectModule({ path: fullPath });
  })
  .then(value => {
    moduleName = value;
    const fullPath = p.join(rootPath, domainPath, moduleName);
    return exist({ path: fullPath });
  })
  .then(existModuleDir => {
    if (!existModuleDir) {
      throw new Error(`Module dir ${p.join(domainPath)} doesn't exist`);
    }

    if (entityName) {
      return entityName;
    }
    return askEntityName();
  })
  .then(value => {
    entityName = value;
    const fullPath = p.join(rootPath, domainPath, moduleName);
    console.log({ fullPath, entity: entityName });
  });
