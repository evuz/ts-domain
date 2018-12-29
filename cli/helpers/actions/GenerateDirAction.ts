import { PathLike } from 'fs';

import { mkDir } from '../../utils/fs';
import { Action } from './Action';
import { IGenerateDirAction, ActionType } from './types';

export class GenerateDirAction extends Action {
  private path: PathLike;

  constructor(props: IGenerateDirAction) {
    super({ ...props, type: ActionType.GenerateDir });
  }

  execute() {
    return mkDir({ path: this.path, options: { recursive: true } });
  }
}
