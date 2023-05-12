export const bisecLeft = (array:number[], comparator: Function) => {
    let start = 0;
    let end = array.length - 1;
    let result = -1;

    while (start < end) {
        let index = Math.floor((start + end)/2);
        let elem = array[index];

        if (comparator(elem) === 0) {
            result = index;
            end = index;
        }

        if (comparator(elem) > 0) {
            end = index;
        } else if (comparator(elem) < 0) {
            start = index + 1;
        }
    }

    return result;
}

export const bisecRight = (array:number[], comparator: Function) => {
    let start = 0;
    let end = array.length - 1;
    let result = -1;

    while (start < end) {
        let index = Math.floor((start + end)/2);
        let elem = array[index];

        if (comparator(elem) === 0) {
            result = index;
            start = index;
        }

        if (comparator(elem) > 0) {
            end = index - 1;
        } else if (comparator(elem) < 0) {
            start = index;
        }
    }

    return result;
}