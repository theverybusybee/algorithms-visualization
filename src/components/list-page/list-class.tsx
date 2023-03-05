interface IList<T> {
  addToTheHead: (item: T) => void;
  addToTheTail: (item: T) => void;
  deleteFromTheHead: () => void;
  peak: () => T | null;
}

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class List<T> implements IList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(node: Node<T>) {
    this.head = node;
    this.tail = node;
  }

  addToTheHead = (item: T) => {
    const newNode = new Node<T>(item);

    // Если очередь пуста, новый элемент будет и tail, и head
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
      return this;
    }

    const currentNode = this.head;

    // Добавляем новый элемент в конец очереди и меняем tail
    this.head = newNode;
    this.head.next = currentNode;
  };

  addToTheTail = (item: T): void => {
    const newNode = new Node<T>(item);

    // Если очередь пуста, новый элемент будет и tail, и head
    if (this.tail === null) {
      this.tail = newNode;
      this.head = this.tail;
      return;
    }

    // Добавляем новый элемент в конец очереди и меняем tail
    this.tail.next = newNode;
    this.tail = newNode;
  };

  deleteFromTheHead = (): void => {
    // Если очередь пустая, ничего не удаляем
    if (this.head === null) {
      return;
    }

    // Удаляем первый элемент из очереди
    this.head = this.head.next;

    // Если head стал null, то меняем на null и tail
    if (this.head === null) {
      this.tail = null;
    }
  };

  getLength = (): number => {
    let length = 0;
    while (this.head) {
      length++;
      this.head = this.head!.next;
    }
    return length;
  };

  iterate = (): void => {
    let current = this.head;

    while (current) {
      console.log(current); // output the value of the node
      current = current.next;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      console.log("stack is empty");
    }
    return this.head?.value || null;
  };

  isEmpty = (): boolean => {
    return this.head === null;
  };
}
