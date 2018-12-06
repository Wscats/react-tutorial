## 普通样式名称使用 —— className
app.css
```css
.c1{
    color: red;
    width: 100%;
    height: 300px;
    border: solid 1px red;
}
```
app.js
```javascript
import './app.css'

import React from 'react';
import ReactDOM from 'react-dom';

import './modules/cp/cp.scss'
class Component1 extends React.Component{
    render(){
        return (
            <div className="c1"></div>
        )        
    }
}

ReactDOM.render(
    <Component1 />,
    document.getElementById('app')
)
```

## 行内样式
```javascript
let c1 = {
    color: 'red',
    width: '100%',
    height: '300px',
    border: 'solid 1px red'
}
class Component1 extends React.Component{
    render(){
        console.log(c1)
        return (
            <div style={c1}></div>
        )        
    }
}
```