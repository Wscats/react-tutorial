import './libs/bootstrap/css/bootstrap.min.css'
import './libs/font-awesome/css/font-awesome.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './redux/configStore'
import CNodeComponent from './components/cnode/cnode'

ReactDOM.render(
    <Provider store={store}>
        <CNodeComponent/>
    </Provider>,
    document.getElementById('app')
)