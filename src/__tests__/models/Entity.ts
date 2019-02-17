import { Entity } from '../../models/Entity';

interface IFoo {
  bar: string;
}
class Foo extends Entity<IFoo> {
  baz = 'baz';
  constructor(props: IFoo) {
    super(props);
  }
}

describe('Models => Entity', () => {
  test('should flat class', () => {
    const foo = new Foo({ bar: 'bar' });
    expect(foo.flat()).toEqual({ bar: 'bar' });
  });

  test("shouldn't flat internal property of class", () => {
    const foo = new Foo({ bar: 'bar' });
    expect((<any>foo.flat()).baz).toBeFalsy();
  });
});
