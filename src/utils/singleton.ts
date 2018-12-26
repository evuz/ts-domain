const instances = {};

export function generateSingleton(singleton, ...params) {
  const instance = instances[singleton.name];
  if (instance) {
    return instance;
  }
  const object = new singleton(...params);
  instances[singleton.name] = object;
  return object;
}
