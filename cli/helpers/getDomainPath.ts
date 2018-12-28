import * as path from 'path';

import { readPackageJson } from './readPackageJson';

export function getDomainPath(): Promise<string> {
  const rootPath = process.cwd();
  return readPackageJson({ path: rootPath }).then(packageJson => {
    return packageJson.domain;
  });
}
