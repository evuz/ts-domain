import { generateSingleton, Singleton } from '../../utils/singleton';

// tslint:disable-next-line:max-classes-per-file
class Foo {
  constructor(public x: string, public y: number, public z: string) {}
}
// tslint:disable-next-line:max-classes-per-file
class Bar {
  constructor(public param: string) {}
}
// tslint:disable-next-line:max-classes-per-file
class Baz {
  public param: string;
  constructor({ param }: { param: string }) {
    this.param = param;
  }
}
// tslint:disable-next-line:max-classes-per-file
class Qux {}

describe('Utils => singleton', () => {
  test('should instance a class (deprecated)', () => {
    const foo = generateSingleton(Foo, 'one', 2, 'three');
    expect(foo instanceof Foo).toBeTruthy();
  });

  test('should instance a class with params (deprecated)', () => {
    const param = 'test param';
    const bar = generateSingleton(Bar, param);
    expect(bar.param).toBe(param);
  });

  test('instance class only one time (deprecated)', () => {
    const foo = generateSingleton(Foo, 'one', 2, 'three');
    const sameFoo = generateSingleton(Foo, 'one', 2, 'three');
    expect(foo).toBe(sameFoo);
  });

  test('instance two differents class (deprecated)', () => {
    const foo = generateSingleton(Foo, 'one', 2, 'three');
    const bar = generateSingleton(Bar, 'one');
    expect(foo).not.toBe(bar);
  });

  test('should instance a class', () => {
    const baz = new Singleton(Baz, { param: 's' }).getInstance();
    expect(baz instanceof Baz).toBeTruthy();
  });

  test('should instance a class with params', () => {
    const param = 'test param';
    const bar = new Singleton(Bar, param).getInstance();
    expect(bar.param).toBe(param);
  });

  test('should instance a class with several params', () => {
    const params = { x: 'param_x', y: 3, z: 'param_z' };
    const props = Object.keys(params).map(key => params[key]);
    const bar = new Singleton(Foo, ...props).getInstance();
    Object.keys(params).forEach(key => {
      expect(bar[key]).toBe(params[key]);
    });
  });

  test('should instance class only one time', () => {
    const qux = new Singleton(Qux);
    const instance = qux.getInstance();
    expect(qux.getInstance()).toBe(instance);
  });

  test('should instance two differents class', () => {
    const foo = new Singleton(Foo, 'one', 2, 'three').getInstance();
    const bar = new Singleton(Bar, 'param').getInstance();
    expect(foo).not.toBe(bar);
  });
});
