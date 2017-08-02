import React from 'react';
import ReactDOM from 'react-dom';
import Basic from "./components/basic.jsx";

//redux
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';

//模块化action，方便在组件中调用
import {increaseAction, multiAction} from './action.js';
//模块化reducer
import counter from './reducer.js';

// Store
const store = createStore(counter);

// Action
// const increaseAction = {
//   type: 'increase'
// }
//
// const multiAction = {
//   type: 'multi'
// }

// Reducer
// function counter(state = {
//   count: 0
// }, action) {
//   const count = state.count
//   switch (action.type) {
//     case 'increase':
//       return {
//         count: count + 2
//       }
//     case 'multi':
//       return {
//         count: count * 2
//       }
//     default:
//       return state
//   }
// }

// 放在Basic入面connect
// // Map Redux state to component props
// function mapStateToProps(state) {
//   return {value: state.count}
// }
//
// // Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//   return {
//     onIncreaseClick: () => {
//       //可以触发多个
//       dispatch(increaseAction())
//       dispatch(multiAction())
//     }
//   }
// }

// Connected Component
//const App = connect(mapStateToProps, mapDispatchToProps)(Basic)

ReactDOM.render((
  <Provider store={store}>
    <Basic/>
  </Provider>
), document.getElementById('root'))
