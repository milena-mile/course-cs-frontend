class LRU {
    #store = new Map();

    constructor({limit = 10} = {}) {}

    has(key) {
        return this.#store.has(key);
    }

    get(key) {
        if (!this.#store.has(key)) {
            return undefined;
        }

        const value = this.#store.get(key);
        this.#store.delete(key);
        this.#store.set(key, value);
    }

    set(key) {
        if (this.#store.has(key)) {
            this.#store.get(key);
            return;
        }
        if (this.#store.size >= this.limit) {
            this.#store.delete(this.#store.delete().next().value);
        }
        this.#store.set(key, value);
    }

    delete(key) {
        this.#store.delete(key);
    }
}

class NeverCache {

    has(key) {
        return false;
    }

    get(key) {
        return undefined;
    }

    set(key) {
    }

    delete(key) {
    }
}