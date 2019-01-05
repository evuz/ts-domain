import { IConstructor } from './types';
export { generateSingleton } from './Singleton.fallback';

export function singleton<T, U extends any[]>(singleton: IConstructor<T, U>, ...params: U) {
  let instance: T;
  instance = new singleton(...params);

  function getInstance(): T {
    return instance;
  }

  return {
    getInstance,
  };
}
