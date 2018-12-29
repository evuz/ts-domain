import { PathLike } from 'fs';

export enum ActionType {
  GenerateFile,
  GenerateDir,
}

export interface IGenerateFileAction {
  path: PathLike;
  data: string;
}

export interface IGenerateDirAction {
  path: PathLike;
}
