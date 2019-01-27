export class Task {
  private text_: string;
  private done: boolean;

  constructor(text: string) {
    this.text_ = text;
    this.done = false;
  }

  text(): string {
    return this.text_;
  }

  markDone(): void {
    this.done = true;
  }

  isDone(): boolean {
    return this.done;
  }
}
