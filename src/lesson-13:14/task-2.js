const myRegExp2 = /(?:,\d+)+;/;
const str = '762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'

let arr = str.split(myRegExp2).slice(0, -1); // ['762120', '763827', '750842', '749909', '755884']
console.log(arr);
