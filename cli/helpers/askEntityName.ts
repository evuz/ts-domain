import { prompt, Questions } from 'inquirer';

import { emptyValidator } from '../utils/validators/empty';

export function askEntityName() {
  const questions: Questions = [
    { type: 'input', name: 'entityName', message: 'Please, enter the entity name: ', validate: emptyValidator },
  ];
  return prompt(questions).then(({ entityName }) => entityName);
}
