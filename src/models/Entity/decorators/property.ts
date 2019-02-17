import { Entity } from '../Entity';

export function property() {
  return function(target: any, key: string) {
    if (!(target instanceof Entity)) {
      throw Error(`Property ${key} doesn't belong a Entity`);
    }
    const properties = (<any>target)._properties || [];
    properties.push(key);
    Object.defineProperty(target, '_properties', {
      value: properties,
    });
  };
}
