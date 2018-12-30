import { PathLike } from 'fs';

import { writeFile } from '../utils/fs';
import { Action } from './Action';
import { IGenerateFileAction, ActionType } from './types';

export class GenerateFileAction extends Action {
  private path: PathLike;
  private data: string;

  constructor(props: IGenerateFileAction) {
    super({ ...props, type: ActionType.GenerateFile });
  }

  execute() {
    return writeFile({ path: this.path, data: this.data });
  }
}
