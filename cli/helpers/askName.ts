import { prompt, Questions } from 'inquirer';

import { emptyValidator } from '../utils/validators/empty';

export function askName({ name }: { name: string }) {
  const questions: Questions = [
    { type: 'input', name: 'name', message: `Please, enter the ${name.toLowerCase()} name:`, validate: emptyValidator },
  ];
  return prompt(questions).then(({ name }) => name);
}
