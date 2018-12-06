# React 使用

React 是一个第三方的框架库，所以在使用前要先把相关的库文件引入。
```html
<!-- React 核心库 -->
<script src="react.js"></script>
<!-- React 跟 DOM 相关的功能库 -->
<script src="react-dom.js"></script>
<!-- Babel 库，将 JSX 语法转为 JavaScript 语法 -->
<!-- Babel 还可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。Babel 内嵌了对 JSX 的支持-->
<script src="browser.min.js"></script>
```
React 是基于 jsx 语法去实现，所以需要明确 script 的类型为 text/babel
```html
<script type="text/bebal"></script>
```

使用 React 的核心对象和方法`ReactDOM.render`进行将 html 标签渲染到指定的容器
```html
<body>
    <div id="div1"></div>
    <div id="div2"></div>
    <div id="div3"></div>

    <!--jsx 语法-->
    <script type="text/babel">
        //将标签直接渲染到容器 div1 当中
        ReactDOM.render(<h1>React</h1>, document.getElementById('div1'));

        var _style = {fontSize: '12px', color: 'red'};
        var _name = "Tom";
        var _obj = {name: "React", age: 18};
        //标签与 js 代码混写
        ReactDOM.render(<h1 style={_style}>{_obj.age + (1 + 2)}</h1>, document.getElementById('div2'));

        var array = ["Tom", "Lucy", "Lily"];
        //多级标签和 js 代码混写
        ReactDOM.render(
            <div>
                <ul>
                    {
                        array.map(function(arg1, arg2){
                            return <li key={arg2}>{arg1}</li>;
                        })
                    }
                </ul>
                <ul><li>React</li></ul>
                <ul><li><input type="text" /></li></ul>
            </div>,
            document.getElementById('div3')
        );
    </script>
</body> 
```

# 入门

`ReactDOM.render`负责渲染，此时你可以提供要渲染的模板`<div>hello world</div>`，该模板要渲染的位置`document.querySelector("#demo")`，这是我们react的起手动作。
```js
ReactDOM.render(
    <div>hello world</div>,
    document.querySelector("#demo")
)
```

### 效果预览

- [Hello World](https://wscats.github.io/react-tutorial/react/jsx/1.helloworld.html)

# JSX 语法
一种特殊的 js 语法糖，可以在代码中把 html 标签当对象使用，其可以总结成以下几个特点：

### 不加任何引号
以前在 js 中使用 html 标签都是加上引号当成字符串使用，而在 jsx 语法中不用加引号，直接当对象使用。
```javascript
var html = <h1>React</h1>;
```

### 标签一定要有对应的结束标标签或结束标识：
有时候我们在写 html 结构的时候，都没有把对应的结束标识加上，但浏览器能正常解析，但在 jsx 语法当中，则要强制写标准的 html 结构
这一段 html　标签在浏览器是能正常解析
```html
<input type="text" value="React">
```
这一段在 jsx 语法当中则会报错
```javascript
var html = <input type="text" value="React">;
```
jsx 正确写法应该是这样的
```javascript
var html = <input type="text" value="React" />;
var div = <div>React</div>;
```

### 只能有一个根节点
在 jsx 语法当中，最顶层的结构一定只有一个节点，不能出现兄弟节点。
```javascript
var html = 
    <div>
        <h1>Tom</h1>
        <h1>Lucy</h2>
    </div>
```

### 不能在标签当中加注释
在 jsx 语法当中，html 标签是一个对象，是一种数据结构，而不是真实的 DOM 节点，也不是字符串，所以在标签当中不能添加注释。
下面的代码是在标签当中添加了注释，所以会报错。
```javascript
var html = 
    <div>
        <!--不能添加注释，这里会报错-->
        <h1>Tom</h1>
        <h1>Lucy</h2>
    </div>
```

### jsx 语法允许 html 标签和 javascript 代码混写
在 jsx 语法当中，要在 html 标签中用到 js 代码，则用花括号（{expression}）括起来，注意只有一个大括号`{react}`。相对于 Vue，Vue 是用两个大括号`{{vue}}`来渲染数据的，React 是单向数据绑定的，Vue 是双向数据绑定的。
```javascript
var name = "React";
var style = {fontSize: '12px', color: 'red'};
var html = <span style={style}>{name}</span>;
```
最终上面的代码将会解析成
```html
<span style="font-size:12px; color:red">DK</span>
```
粗暴的理解

> JSX = JS + HTML

### 效果预览

- [最基本的JSX语法](https://wscats.github.io/react-tutorial/react/jsx/3.jsx.html)


# 函数式编程

Vue 有丰富的指令`v-text,v-html,v-model,v-if,v-show`，本质是接受数据，返回对应的视图，而 React 与之对应的是函数式编程，数据进来，然后通过函数里面的算法或者逻辑处理，返回给页面的东西，函数式编程其实是指令的另一种呈现，它可以模拟一切跟 Vue 相似的指令，下面公式是对这个概念的暴力理解。


> V = T(S)  //View=Template(State)

```js
function render(data){
    return data
}

视图层 = render(数据层)
```
### 效果预览

- [函数式编程](https://wscats.github.io/react-tutorial/react/jsx/4.函数式编程.html)

## 渲染数组

相当于 vue 里面`v-for`指令
```js
<!-- 数据 -->
let data = {
    arr:[
        <p key='1'>a</p>,
        <p key='2'>b</p>,
        <p key='3'>c</p>
    ]
}
<!-- 视图 -->
<div>{data.arr}</div>
<!-- 转化为以下内容 -->
<div>
    <p key='1'>a</p>
    <p key='2'>b</p>
    <p key='3'>c</p>
</div>
```

### 效果预览

- [渲染数组](https://wscats.github.io/react-tutorial/react/jsx/5.v-for.html)


## 渲染样式

标签的属性值 style 比较特殊接受的是对象，相当于`v-bind:style`或者`:style`，注意`fontSize`这种要驼峰写法
```html
<div style={{
    display: "none",
    fontSize: "14px"
}}></div>
```
### 效果预览

- [用样式实现显示和隐藏](https://wscats.github.io/react-tutorial/react/jsx/6.v-show.html)

## 渲染属性值

相当于 Vue 里面的`v-bind:xxx`，大部分属性值后面我们都可以直接用`{}`来渲染对应的属性值
```js
<div name={data.name}>hello world</div>
```
由于属性值 class 是关键词，避免和 js 里面冲突，如果属性值出现下面两个的话，要进行转换

|HTML|JSX|
|-|-|
|class|className|
|for|htmlFor|

```html
<img src={data.src} />
<p className={}></p>
<label htmlFor={}  />
```

### 效果预览

- [渲染属性值](https://wscats.github.io/react-tutorial/react/jsx/7.v-bind:xxx.html)

## 渲染html结构

于`v-html`指令相似，尽量少用,要防止xss攻击
```html
<!-- data -->
html: '<p>123<span style="color:red">456</span>789</p>'
<!-- view -->
<div dangerouslySetInnerHTML={{__html:data.html}}></div>
```

### 效果预览

- [渲染HTML](https://wscats.github.io/react-tutorial/react/jsx/8.v-html.html)


## v-if

于`v-if`指令相似
```js
<div>{
    (()=>{
        if(data.bool){
            return <p>真</p>
        }
    })()
}</div>    
```

### 效果预览

- [节点的增删](https://wscats.github.io/react-tutorial/react/jsx/10.v-if.html)



## v-on

监听事件,原生的写法`onclick`而react需要on之后的那个字母大写`onClick`

|原生|React|Vue|
|-|-|-|
|onclick|onClick|@click/v-on:click|
|onchange|onChange||
|onkeyup|onKeyup|
|...||

```js
let methods = {
    test(e){
        console.log(e.target)
        console.log("你好")
    }
}
<div>
    <button onClick={methods.test}>ok</button>
</div>
```

### 效果预览

- [节点的增删](https://wscats.github.io/react-tutorial/react/jsx/11.v-on.html)


## this的指向

`onClick={this.test}`这里是不能用加括号的这种方式来传参`onClick={this.test(params)}`，并且这样写之后`this.test`里面的this会是`undefined`，所以在react，函数带参数是要配合`bind`方法，通过`bind`获取`this`和参数
```html
<button @click="test()">ok</button>
<button onClick={this.test}>ok</button>
<!-- 参数 -->
<button onClick={this.test.bind(this,参数)}>ok</button>
```