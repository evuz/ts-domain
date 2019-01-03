import { PathLike } from 'fs';
import { FactoryMethodTemplate } from '../templates/FactoryMethod';
import { ImportTemplate } from '../templates/Import';

export enum ActionType {
  GenerateFile,
  GenerateDir,
  EditFactory,
}

export interface IGenerateFileAction {
  path: PathLike;
  data: string;
}

export interface IGenerateDirAction {
  path: PathLike;
}

export interface IEditFactoryAction {
  path: PathLike;
  template: FactoryMethodTemplate;
  importTemplate?: ImportTemplate;
}
