export function intoIter<T>(iterable: Iterable<T>): IterableIterator<T> {
    const iter = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            return iter.next();
        }
    }
}

export function* intoSeq<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
    for (const iterable of iterables) {
      yield* intoIter(iterable);
    }
}

export function* intoBuffer<T>(iterable: Iterable<T>, buffer: T[]): IterableIterator<T> {
    for (const item of intoIter(iterable)) {
      buffer.push(item);
  
      yield item;
    }
  }