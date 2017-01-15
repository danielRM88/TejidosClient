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

export function getFabricsService(data, success, error) {
  let page = data.page;
  if (!page) {
    page = 1;
  }
  request
    .get(config.serverUrl+'/api/v1/fabrics')
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

export function getFabricService(data, success, error) {
  request
    .get(config.serverUrl+'/api/v1/fabrics/'+data.id)
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

export function updateFabricService(data, success, error) {
  request
    .put(config.serverUrl+'/api/v1/fabrics/'+data.fabric.id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ fabric: data.fabric })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        // const response = JSON.parse(res.text);
        success(null);
      }
    })
};

export function deleteFabricService(data, success, error) {
  request
    .delete(config.serverUrl+'/api/v1/fabrics/'+data.fabric_id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        // const response = JSON.parse(res.text);
        success();
      }
    })
};

export default createFabricService