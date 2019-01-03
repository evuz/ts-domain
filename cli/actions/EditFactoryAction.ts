import { PathLike } from 'fs';
import * as prettier from 'prettier';

import { Action } from './Action';
import { readFile, writeFile } from '../utils/fs';
import { ActionType, IEditFactoryAction } from './types';
import { FactoryMethodTemplate } from '../templates/FactoryMethod';
import { ImportTemplate } from '../templates/Import';

export class EditFactoryAction extends Action {
  private path: PathLike;
  private template: FactoryMethodTemplate;
  private importTemplate: ImportTemplate;

  constructor(props: IEditFactoryAction) {
    super({ ...props, type: ActionType.EditFactory });
  }

  private addExport({ file }: { file: string }) {
    const fileByLine = file.split(/\n/);
    const lastImport = fileByLine.reverse().findIndex(line => line.startsWith('import '));
    fileByLine.reverse();
    if (this.importTemplate) {
      fileByLine.splice(fileByLine.length - lastImport, 0, this.importTemplate.paint());
    }
    return fileByLine.join(' ');
  }

  execute() {
    return readFile({ path: this.path, options: 'utf8' }).then(data => {
      const fileWithImport = this.addExport({ file: data });
      const content = fileWithImport.replace(/}([^}]*)$/, `${this.template.paint()}$1}`);
      const contentFormat = prettier.format(content, {
        parser: 'typescript',
      });
      return writeFile({ path: this.path, data: contentFormat });
    });
  }
}
