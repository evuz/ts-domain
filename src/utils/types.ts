export interface IConstructor<T> {
  name?: string;
  new (...args: any[]): T;
}

export interface ISingleton<T> {
  class: IConstructor<T>;
  props?: any | any[];
}
