import * as p from 'path';
import * as program from 'commander';
import * as changeCase from 'change-case';
import chalk from 'chalk';

import { getDomainPath } from './helpers/getDomainPath';
import { exist } from './utils/fs';
import { isCorrectPath } from './helpers/isCorrectPath';
import { selectModule } from './helpers/selectModule';
import { askName } from './helpers/askName';
import { Actions } from './actions/Actions';
import { GenerateDirAction } from './actions/GenerateDirAction';
import { GenerateFileAction } from './actions/GenerateFileAction';
import { FactoryTemplate } from './templates/Factory';
import { TemplateType } from './templates/types';
import { EditFactoryAction } from './actions/EditFactoryAction';
import { FactoryMethodTemplate } from './templates/FactoryMethod';
import { ImportTemplate } from './templates/Import';

const FOLDER = 'Repositories';

program
  .option('-d, --domain <path>', 'Enter domain path')
  .option('-m, --module <name>', 'Enter module name')
  .option('-r, --repository <name>', 'Enter repository to use')
  .parse(process.argv);

let domainPath = program.domain;
let moduleName = program.module;
const repositoryName = program.repository;
let serviceName = program.args[0];
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

    if (serviceName) {
      return serviceName;
    }
    return askName({ name: 'service' });
  })
  // TODO: Ask repository to use
  .then(value => {
    serviceName = value;

    const fullPath = p.join(rootPath, domainPath, moduleName, FOLDER);
    return exist({ path: fullPath });
  })
  .then(existModuleDir => {
    const fullPath = p.join(rootPath, domainPath, moduleName, FOLDER);
    if (!existModuleDir) {
      // TODO: change name service/module to use only one
      const factoryTmp = new FactoryTemplate({
        name: serviceName,
        type: TemplateType.Service,
        module: moduleName,
      });
      actions.add([
        new GenerateDirAction({ path: fullPath }),
        new GenerateFileAction({
          path: p.join(fullPath, `factory.ts`),
          data: factoryTmp.paint(),
        }),
      ]);
    } else {
      const service = changeCase.pascalCase(`${repositoryName} repository`);
      // TODO: change name service/module to use only one
      actions.add(
        new EditFactoryAction({
          path: p.join(fullPath, `factory.ts`),
          importTemplate: new ImportTemplate({ path: `./${service}`, modules: [service] }),
          template: new FactoryMethodTemplate({
            name: serviceName,
            type: TemplateType.Repository,
            module: moduleName,
          }),
        }),
      );
    }
    // TODO: Do ServiceTemplate
    // const template = new RepositoryTemplate({ name: repositoryName, module: moduleName });
    // actions.add(
    //   new GenerateFileAction({
    //     path: p.join(fullPath, `${changeCase.pascalCase(`${repositoryName} ${moduleName}`)}Repository.ts`),
    //     data: template.paint(),
    //   }),
    // );
    return actions.execute();
  })
  .then(() => {
    const fullPath = p.join(domainPath, moduleName);
    console.log(
      chalk.greenBright(
        `Your new service ${chalk.yellowBright(serviceName)} was created in ${chalk.yellowBright(fullPath)}`,
      ),
    );
  })
  .catch(err => {
    console.error(err);
  });
