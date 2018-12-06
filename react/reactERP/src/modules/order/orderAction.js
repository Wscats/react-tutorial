import * as orderConstant from './orderConstant'

export function scanCode(){
    return {
        types: [orderConstant.ORDER_SCANCODE_REQUEST, orderConstant.ORDER_PRINT_SUCCESS, orderConstant.ORDER_SCANCODE_FAIL],
        path: 'pro/fetchAllProducts',
        query: {code: '123'}
    }
}

export function print(){
    return {
        type:[orderConstant.ORDER_PRINT_REQUEST, orderConstant.ORDER_PRINT_REQUEST, orderConstant.ORDER_PRINT_FAIL],
        path: 'http://10.3.134.78:81/print',
        method: 'post',
        query: {text: 'DK测试'}
    }
}