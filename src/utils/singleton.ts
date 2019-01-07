import { IConstructor } from './types';
export { generateSingleton } from './Singleton.fallback';

export class Singleton<T, U extends any[]> {
  private instance: T;
  private params: U;

  constructor(private singleton: IConstructor<T, U>, ...params: U) {
    this.params = params;
  }

  public getInstance(): T {
    if (!this.instance) {
      this.instance = new this.singleton(...this.params);
    }
    return this.instance;
  }
}
