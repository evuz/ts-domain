export enum TemplateType {
  Entity = 'entity',
  Repository = 'repository',
  Service = 'service',
  UseCase = 'use_case',
}

export interface IEntityTemplate {
  name: string;
}

export interface IRepositoryTemplate {
  name: string;
  module: string;
}

export interface IRepositoryInterfaceTemplate {
  name: string;
}

export interface IImportTemplate {
  modules: string[];
  path: string;
}

export interface IFactoryTemplate {
  name: string;
  module: string;
  type: TemplateType;
}
