import { prompt, Question } from 'inquirer';
import chalk from 'chalk';

import { readPackageJson } from './readPackageJson';

function ask(): Promise<string> {
  const questions: Question[] = [
    {
      type: 'input',
      name: 'path',
      message: 'Enter the domain path: ',
      validate: value => {
        if (!value) {
          return 'Please enter a path.';
        }
        return true;
      },
    },
  ];

  return prompt(questions).then(({ path }) => {
    console.log(chalk.redBright`⚠️  Remember, you can add the field domain in your package.json with the domain path`);
    return path;
  });
}

export function getDomainPath(): Promise<string> {
  const rootPath = process.cwd();
  return readPackageJson({ path: rootPath }).then(packageJson => {
    const domainPath = packageJson.domain;
    if (!domainPath) {
      return ask();
    }
    return domainPath;
  });
}
