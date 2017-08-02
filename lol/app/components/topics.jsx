import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {connect} from 'react-redux';

import {increaseAction, multiAction} from '../action.js';

const Topic = ({match}) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
class Topics extends React.Component {
  render() {
    const {value, onIncreaseClick} = this.props;
    return (
      <div>
        <h2>主题列表</h2>
        <p>{value}</p>
        <button onClick={onIncreaseClick}>Increase</button>
        <ul>
          <li>
            <Link to="/topics/rendering">
              使用 React 渲染
            </Link>
          </li>
          <li>
            <Link to="/topics/components">
              组件
            </Link>
          </li>
          <li>
            <Link to="/topics/props-v-state">
              属性 v. 状态
            </Link>
          </li>
        </ul>
        <Route path="/topics/:topicId" component={Topic}/>
        <Route exact path="/topics" render={() => (
          <h3>请选择一个主题。</h3>
        )}/>
      </div>
    )
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {value: state.count}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => {
      //可以触发多个
      dispatch(increaseAction())
      dispatch(multiAction())
    }
  }
}

// Connected Component 让Topics也连接上store
module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
