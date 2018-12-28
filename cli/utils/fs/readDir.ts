import * as fs from 'fs';

import { IReadDir } from './types';

export function readDir({ path, options }: IReadDir): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files: string[]) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}
