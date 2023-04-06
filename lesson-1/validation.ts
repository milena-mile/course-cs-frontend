export const assertValidationGet = (uintArray: Uint8Array, arrIndex: number, getBit: number): void => {
    if (arrIndex > uintArray.length || arrIndex < 0) {
        throw new Error('The index is out of array range.');
    }
    if (getBit < 0 || getBit > 7) {
        throw new Error('The bit index should be in range 0..7.');
    }
}
export const assertValidationSet = (uintArray: Uint8Array, arrIndex: number, getBit: number, setBit: number): void => {
    assertValidationGet(uintArray, arrIndex, getBit);

    if (setBit !== 0 && setBit !== 1) {
        throw new Error('Bit should be 0 or 1.');
    }
}