import * as changeCase from 'change-case';

import { Template } from './Template';
import { IEntityTemplate } from './types';

export class EntityTemplate extends Template {
  private name: string;

  protected get tmpl() {
    return `
      export class ${changeCase.pascalCase(this.name)} {
        constructor() { }
      }
    `;
  }

  constructor(props: IEntityTemplate) {
    super(props);
  }
}
