import { ElementStates } from "../../types/element-states";
import { TSortingArray } from "../utils/types";

interface IList<T> {
  insertIntoTheHead: (item: T) => void;
  insertIntoTheTail: (item: T) => void;
  removeFromTheHead: () => void;
  removeFromTheTail: () => void;
  insertByPosition: (position: number, value: T) => void;
  removeFromPosition: (position: number) => void;
  iterate: () => void;
  peak: () => T | null;
  isEmpty: () => boolean;
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
  length: number = 0;
  private createNodesFromArray(values: T[]) {
    values.forEach((value) => this.insertIntoTheTail(value));
  }

  constructor(node: T[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (node?.length) {
      this.createNodesFromArray(node);
    }
  }

  insertIntoTheHead = (item: T) => {
    const newNode = new Node<T>(item);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
      return this;
    }

    const currentNode = this.head;

    this.head = newNode;
    this.head.next = currentNode;
    this.length++;
  };

  insertIntoTheTail = (item: T): void => {
    const newNode = new Node<T>(item);

    if (this.tail === null) {
      this.tail = newNode;
      this.head = this.tail;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  };

  removeFromTheHead = (): void => {
    if (this.head === null) {
      return;
    }

    this.head = this.head.next;
    this.length++;
    if (this.head === null) {
      this.tail = null;
    }
  };

  removeFromTheTail = (): void => {
    if (this.tail === null) {
      return;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = this.head;
    } else {
      let currentNode: Node<T> | null = this.head;
      let previousNode: Node<T> | null = null;
      while (currentNode) {
        if (currentNode.next) {
          previousNode = currentNode;
        }
        currentNode = currentNode.next;
      }
      this.tail = previousNode;
      this.tail!.next = null;
    }
    this.length--;
  };

  getArrayFromLinkedList = (
    iterator = 0,
    currentNode = this.head,
    arr: TSortingArray[] = []
  ): TSortingArray[] => {
    if (currentNode) {
      arr.push({
        value: currentNode.value,
        type: ElementStates.Default,
      });
      iterator++;
      currentNode = currentNode.next;
      return this.getArrayFromLinkedList(iterator, currentNode, arr);
    }

    return arr;
  };

  insertByPosition = (position: number, value: T) => {
    if (position < 0 || position > this.length) {
      return;
    }

    let node = new Node<T>(value);

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current!.next;
        index++;
      }

      prev!.next = node;
      node.next = current;
    }

    this.length++;
  };

  removeFromPosition(position: number) {
    if (position < 0 || position > this.length) {
      return;
    }

    let current = this.head;

    if (position === 0 && current) {
      this.head = current.next;
    } else {
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current!.next;
        index++;
      }

      prev!.next = current!.next;
    }

    this.length--;
  }

  iterate = (): void => {
    let currentNode = this.head;

    while (currentNode) {
      console.log(currentNode);
      currentNode = currentNode.next;
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
