# mdn 阅读笔记-day03

## Javascript 标准内置对象

#### 标准内置对象分类

##### 值属性

> 全局的属性，返回一个简单的值，没有属于自己的属性跟方法

- Infinty 全局属性（global object,全局对象）是一个数值表示无穷大 不可以写，不可配置，不可枚举，初始值是 Number.POSITIVE_INFINITY(正无穷大)
- NaN 全局属性表示不是一个数字（Not A Number），NaN 与 Number.isNaN 的值一样，在现代浏览器中他是一个不可写，不可配置，不可枚举的属性，但是在 ES3 这个属性值是可以更改的，判断一个是是否是 NaN 在比较中也只有 NaN 不等于它自己，必须使用 Number.isNaN 或者 isNaN 函数，Number.isNaN 与 isNaN 的区别，前者是当前值为 NaN 则为 true，后者是当前值转换成 NaN 则为 true
- undefined 全局属性表示原始值 undefined，在现代浏览器中 undefined 是一个不可以写，不可以配置，不可以枚举的全局变量，一个没有赋值的变量类型是 undefined，如果方法或者语句中的操作变量没有赋值就会返回 undefined，也就是说函数如果没有返回值就会返回 undefined，严格相等`typeof x === 'undefined'` 如果非严格模式则与`null`相等，`void 0`等于 undefined
- globalThis 全局属性，包含全局的 This 值，主要来解决在不同的 web 环境中获取全局 global 的问题，

##### 函数属性

> 全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果返回给调用者

- eval 全局对象的一个属性，参数是`string`格式，一个表示 javascript 表达式，语句或一系列语句的字符串，表达式可以包含于以存在的对象属性，返回值返回字符串代码中的返回值，如果返回值为空那么就返回 undefined，如果 eavl 的参数不是字符串则会将参数原封不动的返回，如果不是直接使用 eavl 而是间接性调用 eavl 的作用域则是在全局作用域下，永远不要使用 eavl，因为 eavl 是一个危险函数，我们可以使用`window.Funcrion`来代替 eavl，eval 访问对象成员，不建议用 eavl 访问对象成员因为可以有更好的办法代替他比如`a[b]`而不是`eavl('a.'+ b)`,
  返回值返回最后一个表达式的值,eavl 中定义函数要与`“(“和”)”`定义前缀和后缀，否则返回 undeifned

```js
// 使用eval的糟糕代码:
function looseJsonParse(obj) {
  return eval("(" + obj + ")");
}
console.log(looseJsonParse("{a:(4-1), b:function(){}, c:new Date()}"));
// 不用eval的更好的代码:
function looseJsonParse(obj) {
  return Function('"use strict";return (' + obj + ")")();
}
console.log(looseJsonParse("{a:(4-1), b:function(){}, c:new Date()}"));
```

- uneavl 顶级函数并且不与任何对象相关联（非标准）,参数是一个对象或者表达式`object`返回对象或者表达式的源码

```js
var a = 1;
uneval(a); // returns a String containing 1

var b = "1";
uneval(b); // returns a String containing "1"

uneval(function foo() {}); // returns "(function foo(){})"

var a = uneval(function foo() {
  return "hi";
});
var foo = eval(a);
foo(); // returns "hi"
```

- isFinite 全局函数，判读一个值是否为有限数字，在必要时会将其先转成数值，`NaN`，`+infinity`,`-infinitty` 都会返回 false，否则会返回 true
- isNaN 全局函数，给定值为 NaN 则返回 true 否则返回 false，NaN 的必要性，`NaN == NaN` `NaN === NaN`返回 false,这就证明了`isNaN`的重要性，但是 isNaN 的会转成数值，如果使用 Number.isNaN 则不会转换

```js
console.log(isNaN("aa")); >> true
console.log(Number.isNaN("aa")); >> false
```

- parseFloat 全局函数，不属于任何对象，传入一个字符串，解析成浮点数，传入 bigInt 会丢失精度，会返回 NaN，Infinity，也可以转换已经定义 toSting，valueOf 的对象

```js
parseFloat(3.14);
parseFloat("3.14");
parseFloat("  3.14  ");
parseFloat("314e-2");
parseFloat("0.0314E+2");
parseFloat("3.14some non-digit characters");
parseFloat({
  toString: function () {
    return "3.14";
  },
});
```

- parseInt 全局函数，第一个参数为字符串，第二个参数为`radix`(2-36)进制，返回一个整数或`NaN`,在一些字符中带有`e`字符使用 parseInt 会产生意外的结果，parsetInt 不应该代替`Math.floor`,parseInt 会认识两个字符`+ -`,bigInt 会丢失精度
- decodeURI 全局函数，将以编码的 URI 中所有能识别的转义符转成原字符，但不能解码不会被编码的字符如`#`，当 encodeURI 包含无效字符时会报错`URIError`

```js
decodeURI(
  "https://developer.mozilla.org/ru/docs/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
);
// "https://developer.mozilla.org/ru/docs/JavaScript_шеллы"

try {
  var a = decodeURI("%E0%A4%A");
} catch (e) {
  console.error(e);
}

// URIError: malformed URI sequence
```

- decodeURIComponent,全局函数，将以编码的 URI 中所能识别的字符转换成原字符
- encodeURI，全局函数,替换那些无需保留的并且 URI 中有特殊意思的字符进行编码
- encodeURIComponent，全局函数，转义除了`A-Z a-z 0-9 - _ . ! ~ * ' ( )`的所有字符，参数`uriComponent`在编码之前都会被转成字符串

  - encodeURIComponent() 和 encodeURI 有以下几个不同点：

  ```js
  var set1 = ";,/?:@&=+$"; // 保留字符
  var set2 = "-_.!~*'()"; // 不转义字符
  var set3 = "#"; // 数字标志
  var set4 = "ABC abc 123"; // 字母数字字符和空格
  ```

  ```js
  console.log(encodeURI(set1)); // ;,/?:@&=+$
  console.log(encodeURI(set2)); // -\_.!~\*'()
  console.log(encodeURI(set3)); // #
  console.log(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

  console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
  console.log(encodeURIComponent(set2)); // -\_.!~\*'()
  console.log(encodeURIComponent(set3)); // %23
  console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
  ```

##### 基本对象

> 基本对象是定义或者使用其他对象的基础

- Object,是 javascript 的一种数据类型，用于存储简值集合和更复杂的实体，`objects`可以通过`object（）`构造函数或者使用对象字面量的方式创建,在 javascript 中几乎所有对象都是 object 类型的实例，他们都会从`object.prototype`上继承属性和方法，虽然大部分属性被重写或者覆盖，`object`还可以故意的被创建使其不是一个真正的对象`Object.create(null)`,或者通过一些手段改变对象，使其不是真正的对象`Object.setPrototypeof`，Object 构造函数为给定参数创建一个包装类对象，如果给定的值是`null`或者`undefined`则会返回空对象`{}`,如果传进去的是一个基本类型的值，则会转换成包装对象返回，如果传进去的是引用类型的值，则会返回这个值，与传递的值相同引用
  - 注意：当以非构造函数调用时与构造函数一致 `Object（）`等同于 `new Object（）`
  - 从一个对象上删除一个属性 `Object`上没有提供删除属性的方法必须使用`delete操作符`，Map 中的`Map.prototype.delete()`可以删除自身属性
- Function 每个 javascript 函数都是一个 Function 对象，`(function(){}).constructor === Function`,Function 可以用此动态创建函数，但是会遇到和`eavl()`类似的安全性问题，和较小的性能问题，而和 eavl 不同的是 Function 构造函数只能在全局作用域中运行

##### 数字和日期

##### 字符串

##### 可索引的集合对象

##### 使用键的集合对象

##### 结构化数据

##### 控制抽象对象

##### 反射

##### 国际化

##### WebAssembly

##### 其他

```

```
