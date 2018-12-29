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
import { RepositoryInterfaceTemplate } from './templates/RepositoryInterface';
import { RepositoryTemplate } from './templates/Repository';

const FOLDER = 'Repositories';

program
  .option('-d, --domain <path>', 'Enter domain path')
  .option('-m, --module <name>', 'Enter module name')
  .parse(process.argv);

let domainPath = program.domain;
let moduleName = program.module;
let repositoryName = program.args[0];
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

    if (repositoryName) {
      return repositoryName;
    }
    return askName({ name: 'repository' });
  })
  .then(value => {
    repositoryName = value;

    const fullPath = p.join(rootPath, domainPath, moduleName, FOLDER);
    return exist({ path: fullPath });
  })
  .then(existModuleDir => {
    const fullPath = p.join(rootPath, domainPath, moduleName, FOLDER);
    if (!existModuleDir) {
      const template = new RepositoryInterfaceTemplate({ name: moduleName });
      actions.add(new GenerateDirAction({ path: fullPath }));
      actions.add(
        new GenerateFileAction({
          path: p.join(fullPath, `${changeCase.pascalCase(moduleName)}Repository.ts`),
          data: template.paint(),
        }),
      );
    }
    const template = new RepositoryTemplate({ name: repositoryName, module: moduleName });
    actions.add(
      new GenerateFileAction({
        path: p.join(fullPath, `${changeCase.pascalCase(`${repositoryName} ${moduleName}`)}Repository.ts`),
        data: template.paint(),
      }),
    );
    return actions.execute();
  })
  .then(() => {
    const fullPath = p.join(domainPath, moduleName);
    console.log(
      chalk.greenBright(
        `Your new repository ${chalk.yellowBright(repositoryName)} was created in ${chalk.yellowBright(fullPath)}`,
      ),
    );
  })
  .catch(err => {
    console.error(err);
  });
