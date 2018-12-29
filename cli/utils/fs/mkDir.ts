import * as fs from 'fs';

import { IMkDir } from './types';

export function mkDir({ path, options }: IMkDir): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, options, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
