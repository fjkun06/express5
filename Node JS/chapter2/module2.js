// Then, create a file named module2.js, containing the following:
import('./simple2.mjs')
.then(simple2 => {
 console.log(simple2.hello());
 console.log(simple2.next());
 console.log(simple2.next());
 console.log(`count = ${simple2.default()}`);
 console.log(`Meaning: ${simple2.meaning}`);
})
.catch(err => {
 console.error(err);
});


const util = require('util');
const A = "a different value A";
const B = "a different value B";
const m1 = require('./module1');
console.log(`A=${A} B=${B} values=${util.inspect(m1.values())}`);
console.log(`${m1.A} ${m1.B}`);
const vals = m1.values();
vals.B = "something completely different";
console.log(util.inspect(vals));
console.log(util.inspect(m1.values()));
