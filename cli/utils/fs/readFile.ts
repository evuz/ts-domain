import * as fs from 'fs';

import { IReadFile } from './types';

export function readFile({ path, options }: IReadFile): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
