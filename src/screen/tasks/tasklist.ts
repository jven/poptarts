import { Player } from '../player';
import { Task } from './task';
import { TaskObserver } from './taskobserver';

export class TaskList implements TaskObserver {
  private showerTasks_: Map<number, Task>;
  private poptartTasks_: Map<number, Task>;
  private allTasks_: Task[];

  constructor(deviceIds: number[]) {
    this.allTasks_ = [];

    this.showerTasks_ = new Map<number, Task>();
    deviceIds.forEach(deviceId => {
      const task = new Task(`Player ${deviceId} takes a shower`);
      this.showerTasks_.set(deviceId, task);
      this.allTasks_.push(task);
    });

    this.poptartTasks_ = new Map<number, Task>();
    deviceIds.forEach(deviceId => {
      const task = new Task(`Player ${deviceId} eats a Pop-Tart`);
      this.poptartTasks_.set(deviceId, task);
      this.allTasks_.push(task);
    });
  }

  getAllTasks(): Task[] {
    return this.allTasks_;
  }

  notifyShowerComplete(player: Player): void {
    this.markTaskDone(this.showerTasks_, player);
  }

  notifyEatPoptart(player: Player): void {
    this.markTaskDone(this.poptartTasks_, player);
  }

  private markTaskDone(tasks: Map<number, Task>, player: Player): void {
    const task = tasks.get(player.deviceId);
    if (task) {
      task.markDone();
    }
  }
}
