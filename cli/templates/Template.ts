import * as prettier from 'prettier';

export abstract class Template {
  protected abstract tmpl: string;
  constructor(props: any) {
    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });
  }

  paint() {
    return prettier.format(this.tmpl, { parser: 'typescript' });
  }
}
