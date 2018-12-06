# Redux

React 不同与双向数据绑定框架，它是单向数据流，所以每次更新都得调用`setState`，所以在跨组件通信中会比较迂回。还有就是 React 没有逻辑分层，在开发过程中，逻辑分层是很重要的。

Redux 实现了跨组件通信和逻辑分层的好处，所以在 React 中使用 Redux 更配。

# Redux 简单实现
为了说明问题，先来一个公共对象实现跨组件通信。当然这个也是 flux 的实现原理。
##### actions.js
```javascript
export default {
    increment(){
        return {
            type: "+"
        }
    },
    decrement(){
        return {
            type: '-'
        }
    }
}
```
##### reducer
```javascript
export default (state = 0, action) => {
    switch(action.type){
        case '+':
            return state + 1;
        case '-':
            return state - 1;
        default:
            return state;
    }
}
```
#### component
```javascript
import React, {Component} from 'react'
import {createStore} from 'redux'
import Actions from './actions'
import Reducer from './reducer'

const store = createStore(Reducer);

export default class Component1 extends Component{
    constructor(props){
        super(props);
        this.state = {count: 0}
    }
    increment = () => {
        store.dispatch(Actions.increment());
        this.setState({
            count: store.getState()
        })
    }
    
    render(){
        return (
            <div>
                <h3>component-cp1-{this.state.count}</h3>
                <input type="button" value="increment" onClick={this.increment}/>
            </div>
        )
    }
}
```

### 小结——分层
- Actions 层
    - 用户行为操作，由用户在 View 层触发 `store.dispatch(Actions.increment());`
    - 行为操作应该为一个 `function`且必须返回有`type`属性的对象
    - 每个方法都应该由`store`进行派发。
- Reducer 层  
    - 必须是一个纯函数(一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用)
    - 接受两个参数，第一个为`state`，另一个为`action`
    - `return`的结果可以用`store.getState()`来接收
- Store 层
    - `redux`的一个方法，接受`reducer`，返回一个对象`store`
    - 对象`store`的方法`dispath`用于派发`action`
    - 通过`dispath`派发的`action`会触发`reducer`
- View 层
    - 视图层，也就是组件
    - 通过`getState()`获取的值然后再`setState`便可以显示。

# 基础入门

一般用于复杂的组件之间通信数据，比如

- 父传子(props)         
- 兄弟通信（redux/vuex）平行组件之间的通信

```js
State（存放数据的地方）通信的数据都会存放在这里
Getter (获取需要通信的数据)
Mutation （修改交换的数据）
Action  （触发Mutation）
Module  （分开多个State仓库）
```

## 安装

安装`redux`的两个必须模块
```js
cnpm install --save redux
npm install --save react-redux
```

## 创建仓库

创建一个仓库，最终目的就是要生成一个`store`仓库，该仓库有一个`state`存放数据
还有一个`action`来触发`state`的更改
```js
import { createStore } from 'redux'
// react的写法
const store = createStore((state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
})
// vue的写法
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})
```

## 与react进行关联

把`<Provider>`注入到根组件里面，把`<Router>`和`<App />`组件包含起来，把刚才上面生成的`store`注入到`<Provider store={store}>`组件里面，这个时候，整个app的都可以`redux`的状态管理
```js
// 把上面配置好的store和react进行关联
import { Provider, connect } from 'react-redux';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));
```

## connect

把组件和`store`进行一次关联。就如果没有`connect`，这个仓库是没有任何人能访问的
```js
import { connect } from 'react-redux';
// 该组件如果想跟store进行连接就在导出的时候用
export default connect((state) => {
    // 第一个函数把store里面的值注入到Wnav组件的`props`上面
    // 第一个函数是获取store的值

    // 和store的state产生关系
    console.log(state)
    return state
}, (dispatch) => {
    // 第二个函数是触发store的值改变
    // 相当于vue（action，commit->mutation）
    // 你可以在此处定义多个函数，来去触发store里面的`dispatch`,从而改变`store`里面的值

    // 和store的action产生关系
    return {
        onIncreaseClick() {
            dispatch("increaseAction")
        }
    }
})(Wnav);

// 不连接store的话
// export default Wnav
```