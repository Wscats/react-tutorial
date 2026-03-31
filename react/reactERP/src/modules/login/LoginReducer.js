import * as LoginConstants from './LoginConstants';
import { combineReducers } from 'redux';
import update from 'react-addons-update'

function login(state = [], action){
    const newData = update(state, {$push: [action.body]});
    return newData;
}

function getCode(state = {}, action){
    return state;
}

const logineReducer = combineReducers(
    {
        login,
        getCode
    }
);

export default logineReducer;