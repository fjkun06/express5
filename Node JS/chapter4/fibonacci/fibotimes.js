const math = require('./math');
for (var num = 1; num < 80; num++) {
 let now = new Date().toISOString();
 console.log(`${now} Fibonacci for ${num} = ${math.fibonacci(num)}`);
}