interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
  getContent: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.length && this.container.pop();
  };

   peak = (): any => {
    return (this.container.length ? this.container[this.getSize() - 1] : null)
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;

  getContent = () => this.container;
}
