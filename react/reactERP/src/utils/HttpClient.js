import request from 'superagent'

const LOCAL_SERVER = 'http://localhost:888/';

const DEV_SERVER = '';
const PRO_SERVER = 'http://www.wscats.com/cloudapi/';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${PRO_SERVER}${path}`;
}

const errorHandler = (err) => {
    var str = err.response.status
    str += ' - '
    str += err.response.statusText
    str += '<br/>请求路径：<br/>'
    str += err.response.error.url
    console.log(str);
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        // if(!window.localStorage.getItem('access_token')){
        //     router.push({name: 'login'});
        //     return false;
        // }
        var req = request
            .get(getUrl(path))
            .query(query)
            .set('Authorization',  window.localStorage.getItem('access_token'))
            .end((err, res) => {
                if (err) {
                    errorHandler(err)
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    post: (path, formdata, query) => new Promise((resolve, reject) => {
        // if(path.indexOf('login/index') < 0 && !window.localStorage.getItem('access_token')){
        //     router.push({name: 'login'});
        //     return false;            
        // }
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .set('Authorization',  window.localStorage.getItem('access_token'))
            .query(query)
            .send(formdata)
            .end((err, res) => {
                if (err) {
                    errorHandler(err)
                    reject(err);
                } else {
                    if(path.indexOf('login/index') > -1){
                        window.localStorage.setItem('access_token', res.body.token_type + ' ' + res.body.access_token)
                    }
                    resolve(res.body);
                }
            });
    })
};

export default HttpClient;
