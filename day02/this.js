// const test = {
//   prop: 42,
//   func: function () {
//     return this.prop;
//   },
// };

// console.log(test.func());
// expected output: 42
// this.MDN = "mdn";
// console.log(this === window); >> true
// console.log(window.MDN, this.MDN); >> mdn , mdn
// "use strict";
// function fn() {
//   console.log(this === globalThis);
//   console.log(this, globalThis);
// }
// fn();

// class Example {
//   constructor() {
//     const proto = Object.getPrototypeOf(this);
//     console.log(Object.getOwnPropertyNames(proto));
//   }
//   first() {}
//   second() {}
//   static third() {}
// }

// console.log(new Example()); // ['constructor', 'first', 'second']
class Base {}
class Good extends Base {}
class AlsoGood extends Base {
  constructor() {
    return {a: 5};
  }
}
class Bad extends Base {
  constructor() {
    super();
    console.log(this);
  }
}

new Good();
new AlsoGood();
new Bad(); // ReferenceError
