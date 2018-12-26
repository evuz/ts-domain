export interface IService {
  execute: (args?: any) => any;
}

export abstract class Service {
  public abstract execute: (args?: any) => any;
  private service: IService;
}
