import { IConstructor } from './types';

const instances = {};

// tslint:disable-next-line:function-name
export function Singleton<T, U extends any[]>(
  { singleton, type }: { singleton: IConstructor<T, U>; type: string },
  ...params: U
): T {
  const instance = instances[type];
  if (instance) {
    return instance;
  }
  const object = new singleton(...params);
  instances[singleton.name] = object;
  return object;
}
