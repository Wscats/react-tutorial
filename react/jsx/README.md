# JSX 语法
一种特殊的 js 语法糖，可以在代码中把 html 标签当对象使用，其可以总结成以下几个特点：
### 不加任何引号
以前在 js 中使用 html 标签都是加上引号当成字符串使用，而在 jsx 语法中不用加引号，直接当对象使用
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
在 jsx 语法当中，最顶层的结构一定只有一个节点，不能出现兄弟节点
```javascript
    var html = 
    <div>
        <h1>Tom</h1>
        <h1>Lucy</h2>
    </div>
```
### 不能在标签当中加注释
在 jsx 语法当中，html 标签是一个对象，是一种数据结构，而不是真实的 dom 节点，也不是字符串，所以在标签当中不能添加注释。
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
在 jsx 语法当中，要在 html 标签中用到 js 代码，则用花括号（{expression}）括起来。
```javascript
    var name = "DK";
    var style = {fontSize: '12px', color: 'red'};
    var html = <span style={style}>{name}</span>;
```
最终上面的代码将会解析成
```html
    <span style="font-size:12px; color:red">DK</span>
```

# React 使用
### React 是一个第三方的框架库，所以在使用前要先把相关的库文件引入。
```html
    <!--React 核心库-->
    <script src="../../../../libs/react/react.js"></script>
    <!--React 跟 Dom 相关的功能库-->
    <script src="../../../../libs/react/react-dom.js"></script>
    <!--babel 库，将 JSX 语法转为 JavaScript 语法-->
    <script src="../../../../libs/react/browser.min.js"></script>
```
### React 是基于 jsx 语法去实现，所以需要明确 script 的类型为 text/babel
```html
    <script type="text/bebal"></script>
```
### 使用 React 的核心对象和方法`ReactDOM.render`进行将 html 标签渲染到指定的容器
```html
    <body>
        <div id="div1"></div>
        <div id="div2"></div>
        <div id="div3"></div>

        <!--jsx 语法-->
        <script type="text/babel">
            //将标签直接渲染到容器 div1 当中
            ReactDOM.render(<h1>DK</h1>, document.getElementById('div1'));

            var _style = {fontSize: '12px', color: 'red'};
            var _name = "Tom";
            var _obj = {name: "DK", age: 18};
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
                    <ul><li>Sam</li></ul>
                    <ul><li><input type="text" /></li></ul>
                </div>,
                document.getElementById('div3')
            );
        </script>
    </body>    
```
[效果预览](https://wscats.github.io/react/jsx/jsx.html)