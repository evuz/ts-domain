import * as changeCase from 'change-case';

import { Template } from './Template';
import { IFactoryTemplate, TemplateType } from './types';

export class FactoryTemplate extends Template {
  private name: string;
  private module: string;
  private type: TemplateType;

  protected get tmpl() {
    const pcName = changeCase.pascalCase(this.name);
    const pcModule = changeCase.pascalCase(this.module);
    const pcType = changeCase.pascalCase(this.type);
    const method = changeCase.camelCase(`${this.name} ${this.module} ${this.type}`);
    return `
      import { ${pcName}${pcModule}${pcType} } from './${pcName}${pcModule}${pcType}';

      export class ${pcModule}${pcType}Factory {
        static ${method} = () => {
          return new ${pcName}${pcModule}${pcType}();
        };
      }
    `;
  }

  constructor(props: IFactoryTemplate) {
    super(props);
  }
}
