var config = require('config');
import request from 'superagent';

const createFabricService = (data, success, error) => {
  request
    .post(config.serverUrl+'/api/v1/fabrics')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ fabric: data.fabric })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export default createFabricService