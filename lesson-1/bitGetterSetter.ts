import { Bit } from './types';

export const bitGetterSetter = (array: Uint8Array): Bit => {
    const assertValidation = (arrIndex: number, getBit: number): void => {
        if (arrIndex > array.length || arrIndex < 0) {
            throw new Error('The index is out of array range.');
        }
        if (getBit < 0 || getBit > 7) {
            throw new Error('The bit index should be in range 0..7.');
        }
    }
    
    return {
        get(arrIndex: number, getBit: number): number {
            assertValidation(arrIndex, getBit);
            return (array[arrIndex] & (1 << getBit)) === 0 ? 0 : 1;
        },

        set(arrIndex: number, getBit: number, setBit: number): void {
            assertValidation(arrIndex, getBit);
            if (setBit === 0) {
                array[arrIndex] = array[arrIndex] & ~(1 << getBit);
            } else if (setBit === 1) {
                array[arrIndex] = array[arrIndex] | (1 << getBit);
            } else {
                throw new Error('Bit should be 0 or 1.');
            }
        }
    }
}

