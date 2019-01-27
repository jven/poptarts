import { Task } from './task';

export class TaskListRenderer {
  private tasks: Task[];
  private texts: Phaser.GameObjects.Text[];

  constructor(scene: Phaser.Scene, tasks: Task[]) {
    this.tasks = tasks;
    this.texts = [];

    tasks.forEach((task, idx) => {
      this.texts.push(
          scene.add.text(150, 600 + idx * 20, task.text()).setColor('white')
              .setOrigin(0, 0));
    });
  }

  update() {
    this.tasks.forEach((task, idx) => {
      if (task.isDone()) {
        this.texts[idx].setColor('#333333');
      }
    });
  }
}
