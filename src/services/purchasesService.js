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

export function getPurchaseService(data, success, error) {
  request
    .get(config.serverUrl+'/api/v1/purchases/'+data.id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export function getPurchasesService(data, success, error) {
  let page = data.page;
  if (!page) {
    page = 1;
  }
  // let code = data.code;
  request
    .get(config.serverUrl+'/api/v1/purchases')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .query({ page: page })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export function updatePurchaseService(data, success, error) {
  request
    .put(config.serverUrl+'/api/v1/purchases/'+data.purchase.id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ purchase: data.purchase })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        // const response = JSON.parse(res.text);
        success(null);
      }
    })
};

export default createPurchaseService