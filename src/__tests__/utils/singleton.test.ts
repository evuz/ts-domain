import { Singleton } from '../../utils/singleton';

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
  test('should instance a class', () => {
    const baz = Singleton({ singleton: Baz, type: 'Baz' }, { param: 's' });
    expect(baz instanceof Baz).toBeTruthy();
  });

  test('should instance a class with params', () => {
    const param = 'test param';
    const bar = Singleton({ singleton: Bar, type: 'Bar' }, param);
    expect(bar.param).toBe(param);
  });

  test('should instance a class with several params', () => {
    const params = { x: 'param_x', y: 3, z: 'param_z' };
    const props = Object.keys(params).map(key => params[key]);
    const foo = Singleton({ singleton: Foo, type: 'Foo' }, ...props);
    Object.keys(params).forEach(key => {
      expect(foo[key]).toBe(params[key]);
    });
  });

  test('should instance class only one time', () => {
    const firstInstance = Singleton({ singleton: Qux, type: 'Qux' });
    const secondInstance = Singleton({ singleton: Qux, type: 'Qux' });
    expect(firstInstance).toBe(secondInstance);
  });

  test('should instance two differents class', () => {
    const foo = Singleton({ singleton: Foo, type: 'Foo' }, 'one', 2, 'three');
    const bar = Singleton({ singleton: Bar, type: 'Bar' }, 'param');
    expect(foo).not.toBe(bar);
  });
});
