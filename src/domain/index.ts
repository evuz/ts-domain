import { IDomain, IGetConfig, IGetUseCase, ISetConfig } from './types';

export class Domain<T> {
  private useCases: T;
  private config: { [e: string]: any };

  constructor({ useCases, config = {} }: IDomain<T>) {
    this.useCases = useCases;
    this.config = config;
  }

  public setConfig({ key, config }: ISetConfig) {
    this.config[key] = config;
  }

  public getConfig({ key }: IGetConfig) {
    return this.config[key];
  }

  public get<K extends keyof T>({ useCase }: IGetUseCase<T, K>): T[K] {
    return this.useCases[useCase];
  }
}
