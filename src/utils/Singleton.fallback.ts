import { IConstructor } from './types';

const instances = {};

export function generateSingleton<T>(singleton: IConstructor<T>, ...params: any[]): T {
  const instance = instances[singleton.name];
  console.warn('This method is deprecated. It will cease to exist in version 2, use Singleton instead');
  if (instance) {
    return instance;
  }
  const object = new singleton(...params);
  instances[singleton.name] = object;
  return object;
}
