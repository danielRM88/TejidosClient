var config = require('config');
import request from 'superagent';

const authService = (data, success, error) => {
  request
    .post(config.serverUrl+'/api/v1/auth_user')
    .set('Content-Type', 'application/json')
    .send({ email : data.email })
    .send({ password: data.password })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text)
        success(response);
      }
    })
};

export default authService