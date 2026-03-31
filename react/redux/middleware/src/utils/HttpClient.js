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
    let str = err.response.status
    str += ' - '
    str += err.response.statusText
    str += '<br/>Request path:<br/>'
    str += err.response.error.url
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        const req = request
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
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .query(query)
            .send(formdata)
            .end((err, res) => {
                if (err) {
                    errorHandler(err)
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    })
};

export default HttpClient;
