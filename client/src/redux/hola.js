const regex = /^\d+([\.,]\d+)?$/;
const numString1 = "123";
const numString2 = "123";
const isValid1 = regex.test(numString1);
const isValid2 = regex.test(numString2);
console.log(isValid1); // true
console.log(isValid2); // true