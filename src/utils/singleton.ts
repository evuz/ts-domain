import { IConstructor } from './types';
export { generateSingleton } from './Singleton.fallback';

export class Singleton<T, U extends any[]> {
  private instance: T;
  constructor(singleton: IConstructor<T, U>, ...params: U) {
    this.instance = new singleton(...params);
  }

  public getInstance(): T {
    return this.instance;
  }
}
