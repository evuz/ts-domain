import * as changeCase from 'change-case';

import { Template } from './Template';
import { IEntityTemplate } from './types';

export class EntityTemplate extends Template {
  private name: string;
  constructor(props: IEntityTemplate) {
    super(props);
  }

  paint() {
    return `export class ${changeCase.pascalCase(this.name)} {
      constructor() { }
    }`;
  }
}
