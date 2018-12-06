## 事件和 ref
事件可以直接写到 DOM 节点，然后通过 ref 来获取 DOM 节点
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Component1 extends React.Component{
    focusHandler(){
        this.refs.name.focus();
    }
    render(){
        return (
            <div>
                <input type="text" name="name" placeholder="" ref="name"/>
                <input type="button" name="" value="focus" onClick={this.focusHandler} />
            </div>
        );
    }
};

ReactDOM.render(<Component1/>, document.getElementById('div1'));
```
[效果预览](https://wscats.github.io/react-tutorial/react/component/src/event/event.html)

## 事件对象 —— event
React 在事件方法调用上默认会传一个形参`events`，该对象是一个合成事件，所以不需要担心浏览器兼容的问题。
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Component1 extends React.Component{
    submit(e){
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={this.submit}/>
    }
}

ReactDOM.render(
    <Component1 />,
    document.getElementById('app')
)
```

## 事件 —— this 指针
在所有的事件当中，首先都要弄明白 `this` 指向哪里。而 React 事件中（如上面的案例）默认的 `this` 都是 `undefined`，为了 this 指针能正确指回组件对象本身，通常可以用下面几种方法。
### 事件定义使用箭头函数
```javascript
class Component1 extends React.Component{
    submit = (e) => {
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={this.submit}/>
    }
}
```
### 事件调用时使用用箭头函数
```javascript
class Component1 extends React.Component{
    submit(e){
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={(e) => this.submit(e)}/>
    }
}
```
### 构造函数中使用 bind
```javascript
class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
    }
    submit(e){
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={this.submit}/>
    }
}
```
###  事件调用时用 bind
```javascript
class Component1 extends React.Component{
    submit(e){
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={this.submit.bind(this)}/>
    }
}
```

## 事件传参数
### 事件调用时使用用箭头函数
```javascript
class Component1 extends React.Component{
    submit(e, n){
        console.log(this, n)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={(e) => this.submit(e, 100)}/>
    }
}
```
###  事件调用时用 bind
```javascript
    submit(n, e){
        console.log(n)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit" onClick={this.submit.bind(this, 20)}/>
    }
}
```
