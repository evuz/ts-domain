import * as changeCase from 'change-case';

import { Template } from './Template';
import { IRepositoryTemplate } from './types';

export class RepositoryTemplate extends Template {
  private name: string;
  private module: string;

  protected get tmpl() {
    const pcName = changeCase.pascalCase(this.name);
    const pcModule = changeCase.pascalCase(this.module);
    return `
      import { ${pcModule}Repository } from './${pcModule}Repository';

      export class ${pcName}${pcModule}Repository implements UsersRepository {
        constructor() { }
      }
    `;
  }

  constructor(props: IRepositoryTemplate) {
    super(props);
  }
}
