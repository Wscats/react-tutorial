import * as constants from './datagridconstants'

export function refresh(_config){
    return {
        types: [constants.Requesting, constants.Requested, constants.RequestError],
        url: _config.url,
        method: _config.method || 'get',
        data: _config.data || {},
        name: _config.name
    }
}