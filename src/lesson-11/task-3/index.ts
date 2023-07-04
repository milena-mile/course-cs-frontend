function* graphems(str) {
    const unicode = {
        concatenate: /\u200D/,
        regionalIndicators: /\uD83C[\uDDE6-\uDDFF]/,
        complexEmoji: /[\u261D-\u26F9\u270A-\u270D]|\uD83C[\uDF85-\uDFFF]|\uD83D[\uDC00-\uDD96\uDE45-\uDE4F\uDEA3-\uDECC]|\uD83E[\uDD0F-\uDDDD]/,
        textModifiers:  /[\u0300-\u036F\u1AB0-\u1AFF\u20D0-\u20FF]/,
        colorModifiers: /\uD83C[\uDFFB-\uDFFF]/,
        modifiers: /[\u200D\uFE0F]/
    };

    let baseStr: string | null = null,
        prevChar: string | null = null;
    let needConcat = false;

    for (const char of str) {
        let saveConcat = false;

        if (unicode.modifiers.test(char) || unicode.textModifiers.test(char)) {
            needConcat = true;

            if (unicode.concatenate.test(char)) {
                saveConcat = true;
            }
        } else if (prevChar != null) {
            const isColor = unicode.colorModifiers.test(char);

            if (isColor && unicode.concatenate.test(prevChar)) {
                needConcat = true;
                saveConcat = true;
            } else if (!needConcat) {
                needConcat = isColor && unicode.complexEmoji.test(prevChar) || 
                    unicode.regionalIndicators.test(char) && unicode.regionalIndicators.test(prevChar);
            }
        }

        if (needConcat) {
            baseStr = (baseStr ?? '') + char;
        } else {
            if (baseStr != null) {
                yield baseStr;
            }
            baseStr = char;
        }

        prevChar = char;

        if (!saveConcat) {
            needConcat = false;
        }
    }

    if (baseStr != null) {
        yield baseStr;
    }
}

console.log([...graphems('1😃à🇷🇺👩🏽‍❤️‍💋‍👨')]) // ['1', '😃', 'à', '🇷🇺', '👩🏽‍❤️‍💋‍👨']