import { property } from '../../../models/Entity/decorators/property';
import { Entity } from '../../../models/Entity/Entity';

class Foo extends Entity<Foo> {
  @property()
  bar: string;
  baz: string;
  qux: string;

  constructor(props) {
    super(props);
    this.bar = 'a';
    this.baz = 'b';
  }
}

describe('Models => Decorators => Property', () => {
  test('should flat property', () => {
    const foo = new Foo({ qux: 'c' });
    expect(Object.keys(foo.flat())).toContain('bar');
    expect(Object.keys(foo.flat())).toContain('qux');
  });

  test("should throw error if class doesn't extendo of Entity", () => {
    expect.assertions(1);
    try {
      class Bar {
        @property()
        foo: string;
      }
      const bar = new Bar();
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
