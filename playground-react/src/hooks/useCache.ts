import { useRef } from "react";
import { defaultCacheCapacity, defaultCacheExpiration } from "../constants";
import { CacheConfig } from "../types";

interface TimedValue<V> {
    value: V;
    lastAccess: number;
}

class LRUCache<K, V> {
    private cache: Map<K, TimedValue<V>>;
    private capacity: number;
    private expiration: number;

    constructor(capacity: number, expiration: number) {
        this.cache = new Map<K, TimedValue<V>>();
        this.capacity = capacity;
        this.expiration = expiration;
    }

    get(key: K): V | undefined {
        if (this.cache.has(key)) {
            if (Date.now() - this.cache.get(key)!.lastAccess < this.expiration) {
                let timedValue = this.cache.get(key);
                this.cache.delete(key);
                this.cache.set(key, timedValue!);
                return timedValue!.value;    
            } else {
                this.cache.delete(key);
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    put(key: K, value: V): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else {
            if (this.cache.size >= this.capacity) {
                let lruKey = this.cache.keys().next().value;
                this.cache.delete(lruKey);
            }
        }

        this.cache.set(key, {
            value,
            lastAccess: Date.now()
        });
    }

    clear() {
        this.cache.clear();
    }

    clean() {
        const notExpiredItems = 
            Array.from(this.cache)
            .filter(
                ([key, timedValue]) => 
                Date.now() - timedValue.lastAccess < this.expiration
            );
            
        this.cache = new Map(notExpiredItems);
    }

    get size(): number {
        return this.cache.size;
    }
}

const useCache = <K, V>(cacheConfig: CacheConfig = {}) => {
    const {
        capacity = defaultCacheCapacity,
        expiration = defaultCacheExpiration
    } = cacheConfig;

    const cache = useRef<LRUCache<K, V> | null>(null);

    if (cache.current === null) {
        cache.current = new LRUCache<K, V>(capacity, expiration);
    }

    return cache.current;
};

export default useCache;