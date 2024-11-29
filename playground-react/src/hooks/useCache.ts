import {useRef} from "react";

class LRUCache<K, V> {
  private cache: Map<K, V>;
  private capacity: number;

  constructor(capacity: number) {
    this.cache = new Map<K, V>();
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value!);
      return value;
    }

    return undefined;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    if (this.cache.size === this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
  }
}

const useCache = <K, V>(capacity: number = 3) => {
  const cache = useRef<LRUCache<K, V> | null>(null);

  if (!cache.current) {
    cache.current = new LRUCache<K, V>(capacity);
  }

  return cache.current;
};

export default useCache;
