import * as p from 'path';

import { getDomainPath } from './helpers/getDomainPath';
import { exist } from './utils/fs';
import { isCorrectPath } from './helpers/isCorrectPath';

let domainPath: string;
const rootPath = process.cwd();

getDomainPath()
  .then(value => {
    domainPath = value;
    return isCorrectPath({ path: domainPath });
  })
  .then(({ path: value }) => {
    domainPath = value;
    return exist({ path: domainPath });
  })
  .then(existDomainDir => {
    if (!existDomainDir) {
      throw new Error(`Domain path ${domainPath} doesn't exist`);
    }
    const fullPath = p.join(rootPath, domainPath);
    console.log(fullPath);
  });
