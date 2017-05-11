var config = require('config');
import request from 'superagent';

const createSupplierService = (data, success, error) => {
  request
    .post(config.serverUrl+'/api/v1/suppliers')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ supplier: data.supplier })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export function getSuppliersService(data, success, error) {
  let page = data.page;
  if (!page) {
    page = 1;
  }
  let typeId = data.typeId;
  let numberId = data.numberId;
  request
    .get(config.serverUrl+'/api/v1/suppliers')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .query({ page: page, type_id: typeId, number_id: numberId })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export function getSupplierService(data, success, error) {
  request
    .get(config.serverUrl+'/api/v1/suppliers/'+data.id)
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

export function updateSupplierService(data, success, error) {
  request
    .put(config.serverUrl+'/api/v1/suppliers/'+data.supplier.id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ supplier: data.supplier })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        // const response = JSON.parse(res.text);
        success(null);
      }
    })
};

export function deleteSupplierService(data, success, error) {
  request
    .delete(config.serverUrl+'/api/v1/suppliers/'+data.supplier_id)
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

export default createSupplierService