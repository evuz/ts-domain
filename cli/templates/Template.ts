export abstract class Template {
  constructor(props: any) {
    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });
  }

  abstract paint(): string;
}
