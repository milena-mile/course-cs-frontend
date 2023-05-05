export class HashMap {
    capacity: number;
    buffer: any[];
    length: number = 0;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.buffer = new Array(capacity).fill(null);
    }

    hashingString(key: string) {
        let hash = 0;
        Array.from(key).forEach((item: string) => {
            const charCode = item.charCodeAt(0);
            hash += charCode;
        });
        hash = (hash > this.capacity) ? hash % this.capacity : hash;
        return hash;
    }

    hashingNumber(key: number): number {
        let hash = 1;
        key.toString().split('').forEach((item: string) => {
            hash *= +item;
        });
        hash = (hash > this.capacity) ? hash % this.capacity : hash;
        return hash;
    }

    hashing(key: (string | number)): number {
        let hash: number = 0;
         if (typeof key === 'string') {
            hash = this.hashingString(key);
        } else if (typeof key === 'number') {
            hash = this.hashingNumber(key);
        }
        return hash;
    }

    getKey(item: any, key: (number | string), hash: number): number {
        if (item !== undefined) {
            let itemKey = Object.keys(item)[0];

            if (itemKey !== undefined) {
                if (itemKey != key) {
                    item = item.next;
                    if (item) return this.getKey(item, key, hash);
                    
                } else {
                    return item[itemKey];
                }
            } 
        } 
    }

    get(key: any) {
        key = (typeof key === 'object') ? JSON.stringify(key) : key;
        let hash: number = this.hashing(key)!;
        
        if (typeof this.buffer[hash] === 'object') {
            let val = this.getKey(this.buffer[hash], key, hash);
            return val;
        } else {
            console.log(`Hash doesn't has item '${key}'`);
        }
    }

    set(key: any, value: number) {
        if ((this.length + 1) / this.capacity > 0.75) {
            this.increaseBuffer();
        }
        key = (typeof key === 'object') ? JSON.stringify(key) : key;

        let hash: number = +this.hashing(key)!;
        if (this.buffer[hash] === null || this.buffer[hash] === -1) {

            this.buffer[hash] = {};
            this.buffer[hash][key] = value;
        } else {
            let addList = (el) => {
                if (el.next !== undefined) {
                    el = el.next;
                    addList(el);
                } else {
                    el.next = {};
                    el.next[key] = value;
                }
            }
            addList(this.buffer[hash]);
        }
        this.length++;
    }

    has(key: any) {
        key = (typeof key === 'object') ? JSON.stringify(key) : key;
        let hash: number = this.hashing(key)!;
        let hasItem = this.getKey(this.buffer[hash], key, hash);
        return (hasItem == null || hasItem == undefined || hasItem == -1) ? false : true;
       
    }

    delete(key: any) {
        key = (typeof key === 'object') ? JSON.stringify(key) : key;
        let hash: number = this.hashing(key)!;
        let item = this.buffer[hash];

        if (item !== undefined || item !== null || item !== -1) {
            let itemKey = Object.keys(item)[0];

            if (!item.next) {
                let value = item[itemKey];
                this.buffer[hash] = -1;
                return value;
            }
            while(item) {
                let value;
                let nextItemKey = (item.next) ? Object.keys(item.next)[0] : null;
                if (nextItemKey == key) {
                    value = item.next[nextItemKey!];
                    if (item.next.next) {
                        item.next = item.next.next;
                    } else {
                        delete item.next;
                    }
                    return value;
                } else {
                    item = item.next;
                }
            }
        } else {
            console.log(`Hash doesn't has item '${key}'`);
        }
    }

    increaseBuffer() {
        this.capacity = this.capacity * 2;
        this.buffer = new Array(this.capacity).fill(null);

        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i]) {
                let [ key, value ] = Object.entries(this.buffer[i])[0];
                let hash: number = this.hashing(key)!;
                if (this.buffer[hash]) {
                    let nextItem = this.buffer[hash].next;
                    this.buffer[hash].next[key] = value;
                    nextItem.prev = this.buffer[hash];
                } else {
                    this.buffer[hash] = {};
                    this.buffer[hash][key] = value;
                }
            }
        }
    }
}