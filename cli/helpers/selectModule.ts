import * as p from 'path';
import { prompt, Questions } from 'inquirer';

import { readDir, isDirectory } from '../utils/fs';
import { ISelectModule } from './types';

function questions(choices = []): Questions {
  const input = {
    type: 'input',
    name: 'module',
    message: 'Enter the name of the new module:',
    validate: value => {
      if (!value) {
        return 'Please enter a path.';
      }
      return true;
    },
  };
  if (!choices.length) {
    return [input];
  }
  const list = {
    type: 'list',
    name: 'module',
    message: 'Choose the entity module: ',
    choices: [...choices, 'new'],
  };
  return [list, { ...input, when: ({ module }) => module === 'new' }];
}

export function selectModule({ path }: ISelectModule): Promise<string> {
  return readDir({ path })
    .then(directories => {
      return Promise.all(directories.map(directory => isDirectory({ filePath: p.join(path, directory) }))).then(
        results => {
          return results.reduce((acc, r, i) => {
            if (r) {
              acc.push(directories[i]);
            }
            return acc;
          }, []);
        },
      );
    })
    .then(directories => {
      return prompt(questions(directories)).then(({ module }) => module);
    });
}
