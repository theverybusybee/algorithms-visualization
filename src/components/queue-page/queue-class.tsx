interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getTail: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      console.log("Maximum length exceeded");
    }

    if (this.tail > this.size - 1) {
      return this.container;
    }

    if (this.length < this.size) {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      console.log("No elements in the queue");
    }
    if (this.length < this.size) {
      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      console.log("No elements in the queue");
    }
    return this.container[this.head]; 
  };

  print = () => {
    console.log(this.container);
  };

  getArr = () => {
    return [...this.container];
  };

  getTail = () => {
    return this.tail;
  };

   getHead = () => {
    return this.head;
  };

  clear = () => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty = () => this.length === 0;
}
