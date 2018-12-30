import { Action } from './Action';

export class Actions {
  private actions: Action[] = [];

  add(action: Action | Action[]) {
    const newAction = Array.isArray(action) ? action : [action];
    this.actions = [...this.actions, ...newAction];
  }

  execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        for (let i = 0; i < this.actions.length; i = i + 1) {
          const action = this.actions[i];
          await action.execute();
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
