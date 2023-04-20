import { Structure } from "./types";

export function Structure(schema: (string | number)[][]): Structure {

    let byteLength = schema.reduce( (bits, item) => {
        if (item[1] === "utf16") {
            bits += +item[2];
        } else if (item[1] === "u16") {
            bits += 1;
        }
        return bits * 2;
    }, 0);

    let buffer = new ArrayBuffer(byteLength);
    let uint16Array = new Uint16Array(buffer);

    function setOffset(key: string) {
        let offset = 0;

        for (let i = 0; i < schema.length; i++) {
            if (key !== schema[i][0]) {
                schema[i][1] === "utf16" ? offset += +schema[i][2] : offset += 1;
            } else {
                break;
            }
        }

        return offset;
    }

    function stringToUint16(value: string) {
        let stringToUint: number[] = [];
        for (let i = 0; i < value.length; i++) {
            stringToUint[i] = value[i].charCodeAt(0);
        }
        return stringToUint;
    }

    return {
        set(key: string, value: string | number): void {
            let structureItem = schema.find( item => item[0] === key);
            let offset = setOffset(key);

            if (structureItem !== undefined ) {
                if (typeof value === 'string') {
                    if (value.length > +structureItem[2]) throw new Error(`The value is longer than allowed. It should be up to ${structureItem[2]}`);
                    uint16Array.set(stringToUint16(value), offset);
                } else if (typeof value === 'number') {
                    uint16Array.set([value], offset);
                }
            } else {
                throw new Error(`Structure doesn't have key "${key}".`);
            }
        },

        get(key: string): string | number {
            let structureItem = schema.find( item => item[0] === key);

            if (structureItem !== undefined) {
                let offset = setOffset(key);
                let value = '';

                if (structureItem[1] === "u16") {
                    return uint16Array[offset];
                } else {
                    for (let i = offset; i < +structureItem[2]; i++) {
                        value += String.fromCharCode(uint16Array[i]);
                        if (uint16Array[i] === 0) break;
                    }
                }

                return value;
            } else {
                throw new Error(`Structure doesn't have key "${key}".`);
            }
        }
    }
}