const instances = {};

interface IConstructor<T> {
  name?: string
  new(...args: any[]): T;
};

export function generateSingleton<T>(singleton: IConstructor<T>, ...params: any[]): T {
  const instance = instances[singleton.name];
  if (instance) {
    return instance;
  }
  const object = new singleton(...params);
  instances[singleton.name] = object;
  return object;
}
