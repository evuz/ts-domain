import { ActionType } from './types';

export abstract class Action {
  public type: ActionType;

  constructor(props: any) {
    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });
  }

  public abstract execute(): Promise<void>;
}
