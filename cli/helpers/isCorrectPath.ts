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
      message: 'Insert a correct path: ',
      when: answer => !answer.correct,
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
