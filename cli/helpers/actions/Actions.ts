import { Action } from './Action';

export class Actions {
  private actions: Action[] = [];

  add(action: Action) {
    this.actions = [...this.actions, action];
  }

  execute(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.actions.forEach(async action => await action.execute());
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
