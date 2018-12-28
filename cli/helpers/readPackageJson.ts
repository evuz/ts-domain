import * as p from 'path';

import { readFile } from '../utils/fs';
import { IReadPackageJson } from './types';

export function readPackageJson({ path }: IReadPackageJson): Promise<any> {
  return readFile({ path: p.join(path, 'package.json'), options: 'utf8' }).then(data => {
    return JSON.parse(data);
  });
}
