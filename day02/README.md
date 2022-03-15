# mdn 阅读笔记-day02

#### this

1. 绝大多数情况下运行时绑定
2. es5 引入了 bind 方法设置函数的 this 值，不用考虑函数是如何被调用的
3. Es6 引入了箭头函数，不提供自身的 this 绑定，this 的值将保存为闭合词法上下文的值
4. this 的值是当前执行的上下文（global，function，eval）的一个属性，在非严格模式下他的值永远是一个对象，再严格模式下他的值可以指向任何值

##### 全局上下文

> 无论是否是严格模式下，在全局执行环境中（任何函数体外部）this 指向全局对象

```js
this.MDN = "mdn";
console.log(this === window); >> true
console.log(window.MDN, this.MDN); >> mdn , mdn
```

可以使用 globalThis 来获取全局的对象，无论你的执行上下文在何处都可以获取

##### 函数上下文

> 在函数内部，`this`的值取决于函数被调用的方式

在非严格模式下，且 this 不是由调用设置的，所以 this 的值默认指向全局对象

```js
function f1() {
  return this;
}
//在浏览器中：
f1() === window; //在浏览器中，全局对象是window

//在Node中：
f1() === globalThis;
```

再严格模式下，如果进入执行环境没有设置 this，this 会保持为 undefined，因为下面的例子是直接调用的而不是作为对象的属性或方法调用的`（window.f2）`

```js
function f2() {
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```

##### 类上下文

> this 在类中的表现与函数相似，因为类本质上也是函数

在构造函数中，类中所有非静态方法都会被添加到 this 原型中，静态方法不是 this 的属性，而是类自身的属性

```js
class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto));
  }
  first() {}
  second() {}
  static third() {}
}

new Example(); // ['constructor', 'first', 'second']
```

##### 派生类

> 派生类的函数默认是没有初始 this 的，在构造函数中调用`super`会生成一个 this，相当于执行以下代码,如果派生类在 super 之前调用会报错

```js
this = new Base();
```

##### this 和对象的转换

在非严格模式下使用 call 或者 apply，如果使用 this 的值不是对象，则会尝试转换为对象,null,undefined 则会被转成全局对象`new Number(BoundThid) | String(BoundThid)`

##### bind 方法

> es5 引入了 Function.protoype.bind,调用`f.bind(someObject)`会创建一个与 f 具有相同体的函数和作用域函数，但是在这个函数中他的 this 被永久绑定在了 bind 的第一个参数，无论这个函数是如何被调用的，且 bind 只生效一次

```js
function f() {
  return this.a;
}

var g = f.bind({a: "azerty"});
console.log(g()); // azerty

var h = g.bind({a: "yoo"}); // bind只生效一次！
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
```

##### 箭头函数

> 箭头函数中，this 与封闭词法环境的 this 保持一致，全局代码中，他被设置为全局 this

##### 作为对象的方法

> 当函数作为对象里的方法调用，this 指向调用函数的对象

当`o.f()`调用时，函数内的 this 将绑定到 o 对象

```js
var o = {
  prop: 37,
  f: function () {
    return this.prop;
  },
};

console.log(o.f()); // 37
```

同样 this 的绑定直接收最近成员引用的影响

```js
o.b = {g: independent, prop: 42};
console.log(o.b.g()); // 42
```

##### 原型链中的 this

> 对于对象原型链上某处定义的方法，同样的概念也适用，如果该方法存在同一个原型链上，那么`this`指向的是调用这个方法的对象，就像该方法就这个对象上一样

##### 作为构造函数

> 当一个函数用作构造函数时（使用 new 关键字）他的 this 绑定到正在构造的新对象

备注： 构造函数返回的默认值是 this 所指的那个对象，但是他仍然可以手动返回对象，**如果不是一个对象则返回 this 对象**

```js
/*
 * 构造函数这样工作:
 *
 * function MyConstructor(){
 *   // 函数实体写在这里
 *   // 根据需要在this上创建属性，然后赋值给它们，比如：
 *   this.fum = "nom";
 *   // 等等...
 *
 *   // 如果函数具有返回对象的return语句，
 *   // 则该对象将是 new 表达式的结果。
 *   // 否则，表达式的结果是当前绑定到 this 的对象。
 *   //（即通常看到的常见情况）。
 * }
 */

function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37

function C2() {
  this.a = 37;
  return {a: 38};
}

o = new C2();
console.log(o.a); // logs 38
```

##### 作为一个 dom 的事件处理函数

> 当函数被作为 dom 事件处理函数时，他的 this 指向的是触发这个函数的元素

##### 作为一个内联事件处理函数

> 当函数被内联调用时，它的 this 指向监听器所在的 dom 元素

##### 类中的 this

> 和其他的普通函数一样，方法中的 this 值取决于他们如何调用，可以在构造函数（constructor）中让 this 的指向一直指向这个类的实例（bind）

#### 总结

this 是运行时绑定，在全局中 this 指向全局对象，在函数上下文中（函数体内）在非严格模式下 this 指向全局对象，在函数上下文中（函数体内）在严格模式下如果没有设置 this，this 的值为 undefined，在类的上下文中除了静态方法都会被添加到 this 上，派生类会在构造函数中会产生一个 this，如果在 super 之前调用 this 会报错，在非严格模式下 call，apply 如果 this 的值不是对象则会被转成对象 null 和 undefined 则会被转成 window，bind 将 this 永久绑定，且只生效一次，箭头函数的 this 与封闭词法环境的 this 保持一致，如果使用 call，apply，bind 去改变 this 的指向，this 不会被更改但是参数会被依次传递，对象方法的 this，会指向最近的调用对象，原型链中的 this 与对象中的方法一致，构造函数中的 this，如果构造函数返回值非对象则 this 为新构造的对象，如果构造函数返回的是引用则不会对外部有影响，dom 中的 this 指向触发该方法的 dom，类中的方法与对象中的方法一致，取决于他们被谁调用
