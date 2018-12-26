export interface IDomain<T> {
  useCases: T;
  config?: any;
}

export interface ISetConfig {
  key: string;
  config: any;
}

export interface IGetConfig {
  key: string;
}

export interface IGetUseCase<T, K extends keyof T> {
  useCase: K;
}
