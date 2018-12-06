import React from 'react'
import {createStore, applyMiddleware} from 'redux'

import rootReducer from './rootReducer'

import middleware from './middleware'

const store = createStore(rootReducer, applyMiddleware(middleware));

export default store;