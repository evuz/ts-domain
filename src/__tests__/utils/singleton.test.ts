import { generateSingleton } from '../../utils/singleton';

class Foo {}
// tslint:disable-next-line:max-classes-per-file
class Bar {
  constructor(public param: string) {}
}

describe('Utils => singleton', () => {
  test('should instance a class', () => {
    const foo = generateSingleton(Foo);
    expect(foo instanceof Foo).toBeTruthy();
  });

  test('should instance a class with params', () => {
    const param = 'test param';
    const bar = generateSingleton(Bar, param);
    expect(bar.param).toBe(param);
  });

  test('instance class only one time', () => {
    const foo = generateSingleton(Foo);
    const sameFoo = generateSingleton(Foo);
    expect(foo).toEqual(sameFoo);
  });

  test('instance two differents class', () => {
    const foo = generateSingleton(Foo);
    const bar = generateSingleton(Bar);
    expect(foo).not.toEqual(bar);
  });
});
