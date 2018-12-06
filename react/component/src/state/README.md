## state
state 可以理解成 props，不一样的在于 props 是只读的，而 state 是可读写。当 state 发生改变的时候会重新执行 render 方法去渲染整颗 DOM 树，在渲染的过程中会有 diff 算法去计算哪些 DOM 有更新，从而提升性能。
在使用 state　前要先初始化 `getInitialState`
更改 state 一定要用 `setState`
`getInitialState` 该方法在每次 render 时都会被调用一次。
```javascript
//es5
var StateComponent = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    change: function(event){
        this.setState({text: event.target.value});
    },
    render: function(){
        return (
            <div>
                <p><input type="text" onChange={this.change}/></p>
                <p>{this.state.text}</p>
            </div>
        )
    }
}) 

//es6
import React from 'react';
import ReactDOM from 'react-dom';
class Component1 extends React.Component{
    state = {
        text: ''
    }
    change(event){
        this.setState({text: event.target.value});
    },
    render(){
        return (
            <div>
                <p><input type="text" onChange={this.change}/></p>
                <p>{this.state.text}</p>
            </div>
        )
    }
}
```
[效果预览](https://wscats.github.io/react-tutorial/react/component/src/state/state.html)
