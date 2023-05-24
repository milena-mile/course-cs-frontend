function* iteratorUnicode(str) {
    for (let i = 0; i < str.length; i++) {
        let charCode = str[i].codePointAt(0);

        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            if (i + 1 > str.length) {
                break;
            }

            let nextCharCode = str[i + 1].codePointAt(0);
            let surrogate = str[i];

            if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF) {
                surrogate += str[i + 1];
                i++;
                yield surrogate;
                continue;
            }
        }

        yield str[i];
    }
}

console.log(...iteratorUnicode('fg😀🤓d📷21'));