import { combineReducers } from 'redux';
import update from 'react-addons-update';
import * as OrderConstants from './orderConstant';

//[{name:'娃哈哈', price: 10.22}]
function scanCode(state = [], action){
    if(action.type == OrderConstants.ORDER_PRINT_SUCCESS){
        const newState = update(state, {$push: [action.body]});
        return newState;
    }
    return state;
}

function print(state = {}, action){
    return state;
}

const orderReducers = combineReducers({
    scanCode,
    print
});

export default orderReducers;