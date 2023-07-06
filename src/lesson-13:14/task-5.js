function calc(str) {
const regCalc = /[-+]?\(*[-+]?\d[-+*/\d() ]*/g; 
    const res = str.replace(regCalc, (calc) => Function(`return ${calc}`)());
    return res;
}

console.log(calc(`
Какой-то текст +10 + 15 fff 24 ** 2
Еще какой то текст 2 * 10
`));

//   `
// Какой-то текст 25fff 576
// Еще какой-то текст 20
// `
