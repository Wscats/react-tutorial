import './libs/bootstrap/css/bootstrap.min.css'
import './libs/font-awesome/css/font-awesome.min.css'
import './libs/common/common.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import {Provider} from 'react-redux'

import store from './redux/configStore'
import routes from './router'

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
)