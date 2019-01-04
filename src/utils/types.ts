export interface IConstructor<T, U extends any[]> {
  name?: string;
  new (...args: U | never[]): T;
}
