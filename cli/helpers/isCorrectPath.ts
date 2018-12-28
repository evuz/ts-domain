import { prompt, Question } from 'inquirer';
import chalk from 'chalk';

export function isCorrectPath({ path }) {
  const questions: Question[] = [
    {
      type: 'confirm',
      name: 'correct',
      message: `Is ${chalk.cyan(path)} the correct path?`,
    },
    {
      type: 'input',
      name: 'path',
      message: 'Enter the domain path: ',
      when: answer => !answer.correct,
      validate: value => {
        if (!value) {
          return 'Please enter a path.';
        }
        return true;
      },
    },
  ];
  return prompt(questions).then(answer => {
    if (!answer.correct) {
      return isCorrectPath({ path: answer.path });
    }
    return {
      ...answer,
      path,
    };
  });
}
