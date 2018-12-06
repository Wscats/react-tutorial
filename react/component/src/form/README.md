# 表单
React 是个单向数据流的框架，所以在表单元素与其它 DOM 元素有所不同，而且和双向绑定的框架在操作上也有很大不一样。所以在这里单独拿出来说。在 Vue 和 Angular 框架上分别有对应的 `v-model` 和 `ng-model` 指令在 `<select>`，`<input>`和`<textarea>`实现数据绑定。

## 输入受控
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: 'Hello React'
        }
    }
    render(){
        return (
            <div>
                <p><label>写死value-锁定状态</label><input type="text" value="hello react"/></p>
                <p><label>动态value-锁定状态</label><input type="text" value={this.state.text}/></p>
                <p><label>不指定value-没锁状态</label><input type="text"/></p>
            </div>
        )        
    }
}

ReactDOM.render(<Component1 />, document.getElementById('div1'));
```
这个案例说明了在 React 在表单元素因单向数据流所以在 value 给定后就无法再次修改，所以需要配合 `onChange` 事件来完成。所以上面的案例应该是这样的
```javascript
class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: 'Hello React'
        }
    }
    change = (e) => {
        this.setState({text: e.target.value})
    }
    render(){
        return (
            <div>
                <p><label>写死value-锁定状态</label><input type="text" value="hello react" onChange={this.change}/></p>
                <p><label>动态value-没锁状态</label><input type="text" value={this.state.text} onChange={this.change}/></p>
                <p><label>不指定value-没锁状态</label><input type="text"/></p>
            </div>
        )        
    }
}
```

### 效果预览

- [input表单输入](https://wscats.github.io/react-tutorial/react/component/src/form/input.html)


## textarea 元素
在普通 HTML 中，`textarea` 元素是节点文本值
```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```
但在 React 中，该元素需要使用 `value` 属性。
```javascript
class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: 'Hello React'
        }
    }
    change = (e) => {
        this.setState({text: e.target.value})
    }
    render(){
        return (
            <div>
                <textarea value={this.state.text} onChange={this.change}/>
            </div>
        )        
    }
}
```

## select 元素

在普通 HTML 中， `select`元素要指定默认选中值，就得在对应的`option`中加上属性`selected`
```html
<select>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option selected value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>
```
但在 React 中，只需要给定属性`value`即可
```javascript
class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: 'lime'
        }
    }
    change = (e) => {
        this.setState({text: e.target.value})
    }
    render(){
        return (
            <div>
                <select value={this.state.text} onChange={this.change}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>                
            </div>
        )        
    }
}
```

## input file 元素

因为`<input type="file">`是特殊的元素，它是只读的，所以在 React 中需要用`ref`来进行特殊处理
```javascript
class Component1 extends React.Component{
    submit = (e) => {
        console.log(this.file.files)
    }
    render(){
        return (
            <div>
                <input type='file' ref={input => {this.file = input}}/>
                <input type="button" value="submit" onClick={this.submit} />
            </div>
        )        
    }
}
```

### 效果预览

- [select,input,textarea表单输入](https://wscats.github.io/react-tutorial/react/component/src/form/表单.html)