import { ISingleton } from './types';
export { generateSingleton } from './Singleton.fallback';

export class Singleton<T> {
  private instance: T;
  constructor({ class: singleton, props }: ISingleton<T>) {
    const params = Array.isArray(props) ? props : [props];
    this.instance = new singleton(...params);
  }

  public getInstance(): T {
    return this.instance;
  }
}
