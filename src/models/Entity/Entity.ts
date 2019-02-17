export abstract class Entity<T> {
  // tslint:disable-next-line:variable-name
  private _properties: string[];

  constructor(props: Object = {}) {
    const keys = Object.keys(props);
    keys.forEach(key => {
      this[key] = props[key];
    });
    const properties = this._properties || [];
    const value = Array.from(new Set([...properties, ...keys]));
    Object.defineProperty(this, '_properties', {
      value,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }

  flat(): T {
    return this._properties.reduce(
      (acc, key) => {
        acc[key] = this[key];
        return acc;
      },
      <T>{},
    );
  }
}
