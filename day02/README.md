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
