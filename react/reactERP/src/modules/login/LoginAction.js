import * as LoginConstants from './LoginConstants';

export function login(username, password){
    return {
        types: ['a', 'b', 'c'],
        path: 'pro/fetchAllProducts',
        method: 'get',
        query: {username, password}
    }
}

export function getCode(){
    return {
        types: ['getCode1', 'getCode2', 'getCode3']
    }
}