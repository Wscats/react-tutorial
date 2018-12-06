## 组件渲染 —— 条件渲染（动态组件）
很多情况下组件是动态渲染的，比如登录状态，如果已登录则显示退出登录，否则显示登录
```javascript
import React from 'react'

let Login = (props) => {
    return <input type="button" value="login" onClick={props.click}/>;
}


let Logout = (props) => {
    return <input type="button" value="logout" onClick={props.click}/>;
}

export default class CP extends React.Component{
    state = {
        status: 0
    }

    login(){
        this.setState({status: 1})
    }

    logout(){
        this.setState({status: 0})
    }

    render(){
        let button = null;
        if(this.state.status == 0){
            button = <Login click={this.login.bind(this)}/>
        } else {
            button = <Logout click={this.logout.bind(this)} />
        }

        return <div>{button}</div>
    }
}
```
[效果预览](https://wscats.github.io/react-tutorial/react/component/src/render/condition-rendering.html)

## 组件渲染 —— 列表渲染
React 没有指令，所以在列表渲染时得借助数组来完成。

### 列表渲染 —— 简单实现
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

let Component1 = () => {
    let lis = [<li key="Javascript">Javascript</li>, <li key="Vue">Vue</li>, <li key="React">React</li>]

    return (
        <div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}

ReactDOM.render(
    <Component1 />
    document.getElementById('app')
)
```

### 列表渲染 —— 循环 for
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

let Component1 = () => {
    let data = ['Javascript', 'Vue', 'React']

    let lis = [];
    for(let frm of frms){
        lis.push(<li key={frm}>{frm}</li>)
    }

    return (
        <div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}

ReactDOM.render(
    <Component1 />
    document.getElementById('app')
)
```

### 列表渲染 —— 循环 map
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

let Component1 = () => {
    let data = ['Javascript', 'Vue', 'React']

    let lis = data.map((frm) => {
        return <li key={frm}>{frm}</li>
    });

    return (
        <div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}

ReactDOM.render(
    <Component1 />
    document.getElementById('app')
)
```

### 列表渲染 —— 对象数组
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Component1 extends React.Component {
    constructor(props){
        super(props)
    }

    static defaultProps = {
        students: [
            {id: 1, name: 'Tom', age: 18, gender: 1}, 
            {id: 2, name: 'Sam', age: 22, gender: 1}, 
            {id: 3, name: 'Lucy', age: 20, gender: 0}
        ]
    }

    getKeys(item = {}){
        return Object.keys(item)
    }
    render(){
        return (
            <table>
                <thead>
                    <tr>
                        {
                            this.getKeys(this.props.students[0]).map((key) => {
                                return <th key={key}>{key}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.students.map((obj) => {
                            return (
                                <tr key={obj.id}>
                                    {
                                        this.getKeys(obj).map((key, idx) => {
                                            return <td key={key + idx}>{obj[key]}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

ReactDOM.render(
    <Component1 />,
    document.getElementById('app')
)
```

### 列表渲染 —— 键(Keys)
因为 React 是虚拟 DOM 到真实 DOM 的一个过程，而 DOM 本身就是一个对象，对象默认没有唯一标识，所以需要手动指定。

键(Keys) 帮助 React 标识哪个项被修改、添加或者移除了。数组中的每一个元素都应该有一个唯一不变的键(Keys)来标识。

键(Keys)用到列表渲染中，同辈元素中必须是唯一的。

## 组件渲染 —— 组件子节点
因为组件的调用是将组件当成一个 DOM 节点使用，所以组件里面可以包含子节点。React 对组件的子节点通过 `this.props.children` 来获取，通常`this.props.children`会有以下几种情况
1. 如果当前组件没有子节点，它就是 undefined
2. 如果有一个子节点，数据类型是 object
3. 如果有多个子节点，数据类型就是 array

为了解决这种数据类型不一致导致在使用的过程中要不断判断的情况，React 提供了一个方法`Reacth.Children`来处理该属性。
```javascript
var Component1 = React.createClass({
    render: function(){
        return (
            <div>                        
                {
                    React.Children.map(this.props.children, function(childNode){
                        return <li>{childNode}</li>
                    })
                }
            </div>
        );
    }
})

ReactDOM.render(
    <Component1>
        <span>Tom</span>
        <span>Sam</span>
    </Component1>, document.getElementById('div1'));
```
[效果预览](https://wscats.github.io/react-tutorial/react/component/src/props/props.html)