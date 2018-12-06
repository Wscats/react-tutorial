## Redux 跨组件通信之进阶篇 —— Provider 和 connect
### 结构
- component1
    - actions.js
    - reducer.js
    - component1.js
- component2
    - actions.js
    - reducer.js
    - component.js
- redux
    - tore.js
- app.js

### 组件 Component1
#### action.js
```javascript
export  function increment(){
    return {
        type: "+"
    }
}

export function decrement(){
    return {
        type: '-'
    }
}

```
#### reducer.js
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
#### component.js
```javascript
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from './actions'

import Component2 from '../cp2/cp2'
class Component1 extends Component{
    increment = () => {
        console.log(this.props)
        this.props.increment();
    }
    
    render(){
        return (
            <div>
                <h3>component-cp1-{this.props.cp1}</h3>
                <input type="button" value="increment" onClick={this.increment}/>
                <Component2 />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        cp1: store.cp1
    }
}

export default connect(mapStateToProps, Actions)(Component1)
```

### 组件 component2
#### action.js
```javascript
export  function increment(){
    return {
        type: "+"
    }
}

export function decrement(){
    return {
        type: '-'
    }
}
```
#### reducer.js
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
#### component.js
```javascript
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from './actions'

class Component2 extends Component{
    render(){
        return (
            <div>
                <h3>component-cp2-{this.props.cp2}</h3>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        cp1: store.cp1,
        cp2: store.cp2
    }
}

export default connect(mapStateToProps, Actions)(Component2)
```

### store.js
```javascript
import {createStore} from 'redux';
import { combineReducers } from 'redux';
import cp1 from '../components/cp1/reducer'
import cp2 from '../components/cp2/reducer'

const rootReducer = combineReducers({
    cp1,
    cp2
});

const store = createStore(rootReducer)

export default store;
```

### app.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import {Provider} from 'react-redux'

import store from './redux/configStore'

import Component1 from './components/cp1/cp1'

ReactDOM.render(
    <Provider store={store}>
        <Component1/>
    </Provider>,
    document.getElementById('app')
)
```

## 小结
- 组件使用了`react-redux.connet`将`state`和`action`全部合并到了`props`中去
- `connet`第一个参数为一个方法，该方法的第一个参数就是`store`，也就是通过`redux.combineReducers`来进行合并得到一个`rootReducer`
- 在最外层的根元素当中使用了`react-redux.Provider`组件，其属性`store`就是通过`redux.createStore`出来的`store`
- 当通过`props`调用`actions`时，`redux`隐性调用了`store.dispath`，而不用手动去调用。
- 在`reducer`中返回的值，也会传到`mapStateToProps`的参数当中去，而不用再手动调用`store.getState()`
