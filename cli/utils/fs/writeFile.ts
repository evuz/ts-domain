import * as fs from 'fs';

import { IWriteFile } from './types';

export function writeFile({ path, data, options }: IWriteFile): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, err => {
      if (err) {
        reject(err);
      }

      return resolve();
    });
  });
}
