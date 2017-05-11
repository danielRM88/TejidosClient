var config = require('config');
import request from 'superagent';

const createPurchaseService = (data, success, error) => {
  request
    .post(config.serverUrl+'/api/v1/purchases')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ purchase: data.purchase })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export default createPurchaseService