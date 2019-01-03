import { Template } from './Template';
import { IImportTemplate } from './types';

export class ImportTemplate extends Template {
  private modules: string[];
  private path: string;

  protected get tmpl() {
    return `import { ${this.modules.join(', ')} } from '${this.path}';`;
  }

  constructor(props: IImportTemplate) {
    super(props);
  }

  paint() {
    return this.tmpl;
  }
}
