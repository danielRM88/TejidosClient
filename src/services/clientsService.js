var config = require('config');
import request from 'superagent';

const createClientService = (data, success, error) => {
  request
    .post(config.serverUrl+'/api/v1/clients')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ client: data.client })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export function getClientsService(data, success, error) {
  let page = data.page;
  if (!page) {
    page = 1;
  }
  request
    .get(config.serverUrl+'/api/v1/clients')
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

export function getClientService(data, success, error) {
  request
    .get(config.serverUrl+'/api/v1/clients/'+data.id)
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

export function updateClientService(data, success, error) {
  request
    .put(config.serverUrl+'/api/v1/clients/'+data.client.id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ client: data.client })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        // const response = JSON.parse(res.text);
        success(null);
      }
    })
};

export function deleteClientService(data, success, error) {
  request
    .delete(config.serverUrl+'/api/v1/clients/'+data.client_id)
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

export default createClientService