// import httpclient from '../../utils/HttpClient'
import * as LoginConstants from './LoginConstants';
import { combineReducers } from 'redux';
import update from 'react-addons-update'
function login(state = [], action){

    // httpclient.post(action.url, action.data).then(response => {
    //     console.log(response);
    //     state.state = response.state;
    //     return state;
    // })

    // return state;

    // state.dataset = action.response.data.data;
    // console.log(action);
    const newData = update(state, {$push: [action.body]});
    // console.log(newData, state);
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