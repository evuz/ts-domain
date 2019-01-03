import * as changeCase from 'change-case';

import { Template } from './Template';
import { IRepositoryInterfaceTemplate } from './types';

export class RepositoryInterfaceTemplate extends Template {
  private name: string;

  protected get tmpl() {
    const pcName = changeCase.pascalCase(this.name);
    return `
      export interface ${pcName}Repository { }
    `;
  }

  constructor(props: IRepositoryInterfaceTemplate) {
    super(props);
  }
}
