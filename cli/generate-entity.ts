import * as p from 'path';
import * as program from 'commander';
import * as changeCase from 'change-case';
import chalk from 'chalk';

import { getDomainPath } from './helpers/getDomainPath';
import { exist } from './utils/fs';
import { isCorrectPath } from './helpers/isCorrectPath';
import { selectModule } from './helpers/selectModule';
import { askName } from './helpers/askName';
import { Actions } from './helpers/actions/Actions';
import { GenerateDirAction } from './helpers/actions/GenerateDirAction';
import { GenerateFileAction } from './helpers/actions/GenerateFileAction';
import { EntityTemplate } from './templates/Entity';

const FOLDER = 'Entities';

program
  .option('-d, --domain <path>', 'Enter domain path')
  .option('-m, --module <name>', 'Enter module name')
  .parse(process.argv);

let domainPath = program.domain;
let moduleName = program.module;
let entityName = program.args[0];
const rootPath = process.cwd();
const actions = new Actions();

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
    const fullPath = p.join(rootPath, domainPath);
    domainPath = value;

    if (moduleName) {
      return moduleName;
    }
    return selectModule({ path: fullPath });
  })
  .then(value => {
    moduleName = value;

    if (entityName) {
      return entityName;
    }
    return askName({ name: 'entity' });
  })
  .then(value => {
    entityName = value;
    const fullPath = p.join(rootPath, domainPath, moduleName, FOLDER);
    return exist({ path: fullPath });
  })
  .then(existModuleDir => {
    const fullPath = p.join(rootPath, domainPath, moduleName, FOLDER);
    if (!existModuleDir) {
      actions.add(new GenerateDirAction({ path: fullPath }));
    }
    const template = new EntityTemplate({ name: entityName });
    actions.add(
      new GenerateFileAction({
        path: p.join(fullPath, `${changeCase.pascalCase(entityName)}.ts`),
        data: template.paint(),
      }),
    );
    return actions.execute();
  })
  .then(() => {
    const fullPath = p.join(domainPath, moduleName);
    console.log(
      chalk.greenBright(
        `Your new entity ${chalk.yellowBright(entityName)} was created in ${chalk.yellowBright(fullPath)}`,
      ),
    );
  })
  .catch(err => {
    console.error(err);
  });
