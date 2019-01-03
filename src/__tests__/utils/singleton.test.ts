import { generateSingleton, Singleton } from '../../utils/Singleton';

class Foo {
  constructor(public x, public y, public z) {}
}
// tslint:disable-next-line:max-classes-per-file
class Bar {
  constructor(public param: string) {}
}

describe('Utils => singleton', () => {
  test('should instance a class (deprecated)', () => {
    const foo = generateSingleton(Foo);
    expect(foo instanceof Foo).toBeTruthy();
  });

  test('should instance a class with params (deprecated)', () => {
    const param = 'test param';
    const bar = generateSingleton(Bar, param);
    expect(bar.param).toBe(param);
  });

  test('instance class only one time (deprecated)', () => {
    const foo = generateSingleton(Foo);
    const sameFoo = generateSingleton(Foo);
    expect(foo).toBe(sameFoo);
  });

  test('instance two differents class (deprecated)', () => {
    const foo = generateSingleton(Foo);
    const bar = generateSingleton(Bar);
    expect(foo).not.toBe(bar);
  });

  test('should instance a class', () => {
    const foo = new Singleton({ class: Foo }).getInstance();
    expect(foo instanceof Foo).toBeTruthy();
  });

  test('should instance a class with params', () => {
    const param = 'test param';
    const bar = new Singleton({ class: Bar, props: param }).getInstance();
    expect(bar.param).toBe(param);
  });

  test('should instance a class with several params', () => {
    const params = { x: 'param_x', y: 'param_y', z: 'param_z' };
    const props = Object.keys(params).map(key => params[key]);
    const bar = new Singleton({ props, class: Foo }).getInstance();
    Object.keys(params).forEach(key => {
      expect(bar[key]).toBe(params[key]);
    });
  });

  test('instance class only one time', () => {
    const foo = new Singleton({ class: Foo });
    const instance = foo.getInstance();
    expect(foo.getInstance()).toBe(instance);
  });

  test('instance two differents class', () => {
    const foo = new Singleton({ class: Foo }).getInstance();
    const bar = new Singleton({ class: Bar }).getInstance();
    expect(foo).not.toBe(bar);
  });
});
