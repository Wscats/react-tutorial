# 组件
组件使你可以将 UI 划分为一个一个独立，可复用的小部件，并可以对每个部件进行单独的设计。

在单页面应用(SPA)中扮演着重要角色

## 组件简单实现 —— 函数式组件
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

let Component1 = () => {
    return <h1>React Component</h1>
}

ReactDOM.render(
    <Component1 />,
    document.getElementById('app')
)
```

## 类组件 —— ES5 语法
```javascript
var React = require('react');
var ReactDOM = require('react-dom')

var Component1 = React.createClass({
    render: function(){
        return (
            <div>
                <h1>Tom</h1>
                <h1>Sam</h1>
            </div>
        )
    }
})

ReactDOM.render(
    <Component1 />,
    document.getElementById('app')
)
```

## 类组件 —— ES6 语法
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Component1 extends React.Component{
    render(){
        return (
            <div>
                <h1>Tom</h1>
                <h1>Sam</h1>
            </div>
        ) 
    }
}

ReactDOM.render(
    <Component1 />,
    document.getElementById('app')
)
```
[效果预览](https://wscats.github.io/react-tutorial/react/component/src/define/define.html)

#### 组件小结
- 组件名首字母必须为大写
- 函数返回一个虚拟 DOM 节点
- 类组件必须要有 render 方法
- render 必须返回一个虚拟 DOM 节点
- 实际工作中，类组件是常用的方式

## 组件属性(Props)
因为组件的调用是 html 标签的形式，而 html 标签是可以添加属性，所以在 React 的组件当中也是可以添加自定义的属性，而属性的获取则用 `this.props`
### 函数式组件
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

let Component1 = (props) => {
    return <h1>name-{props.name}</h1>
}

ReactDOM.render(
    <Component1 name="Sam"/>,
    document.getElementById('app')
)
```
### 类组件
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Component1 extends React.Component{
    render(){
        return <h1>name-{this.props.name}</h1> 
    }
}

ReactDOM.render(
    <Component1 name="Sam"/>,
    document.getElementById('app')
)
```
### 默认属性(DefaultProps)
组件的属性除了可以通过调用的时候以 DOM 节点属性的方式传值，也可以设置默认的属性值，如果调用的时候没有传对应的属性值，则会用默认的属性值。
`getDefalutProps` 这个方法只会被调用一次。
```javascript
//es5
var React = require('react');
var ReactDOM = require('react-dom');
var Component1 = React.createClass({
    getDefaultProps: function(){
        return {
            name: 'Tom',
            age: 20
        }
    },
    render: function(){
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>年龄：{this.props.age}</p>
            </div>
        )            
    }    
})

//es6
import React from 'react';
import ReactDOM from 'react-dom';
class Component1 extends React.Component{
    static defaultProps = {
        name: 'Tom',
        age: 20
    }
    render(){
        return (
            <div>
                <h1>姓名：{this.props.name}</h1>
                <h1>年龄：{this.props.age}</h1>
            </div>
        )
    }
}

//或者
Component1.defaultProps = {
    name: "Sam",
    age: 22
}

//使用
ReactDOM.render(<Component1/>, document.getElementById('div1'));
```
   
### 属性的类型规则(propTypes)
通常情况下，在定义一个组件的时候把属性定义好，会加上一些使用的条件限制，比如某些属性值的数据类型必须是数组，或者某些属性不能为空，在这个时候，可以通过 `propTypes` 来设置。
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

class Component1 extends React.Component{
    render(){
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>年龄：{this.props.age}</p>
                <p>学科：</p>
                <ul>
                {
                    this.props.subjects.map(function(_item){
                        return <li>{_item}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

//定义属性 name 为字符串且必须有值
Component1.propTypes = {
    name: PropTypes.string
}

ReactDOM.render(<Component1 name="Tom"/>, document.getElementById('div1'));
```

prop 默认情况下是可选，常用的类型：
- `PropTypes.array`
- `PropTypes.bool`
- `PropTypes.func`
- `PropTypes.number`
- `PropTypes.object`
- `PropTypes.string`
- `PropTypes.symbol`
- `PropTypes.any.isRequired`
