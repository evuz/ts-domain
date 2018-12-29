import * as fs from 'fs';

import { IExist } from './types';

export function exist({ path }: IExist): Promise<boolean> {
  return new Promise(resolve => {
    fs.access(path, fs.constants.F_OK, err => {
      resolve(!err);
    });
  });
}
