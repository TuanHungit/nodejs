//#Source https://bit.ly/2neWfJ2 
const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  sum += lastDigit;
  return sum % 10 === 0;
};
//console.log(luhnCheck('4485275742308327'));
//console.log(luhnCheck('6011329933655299'));
//console.log(luhnCheck(123456789));

/*var number;
do {
  number = Math.floor(Math.random() * 10000000000000000);
  console.log(number);
  var check = luhnCheck(number);
  console.log(check);
} while (!check);
//console.log(luhnCheck());
*/
module.exports = luhnCheck;