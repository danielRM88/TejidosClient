var config = require('config');
import request from 'superagent';

const createInvoiceService = (data, success, error) => {
  request
    .post(config.serverUrl+'/api/v1/invoices')
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ invoice: data.invoice })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(res.text);
        success(response);
      }
    })
};

export function getInvoiceService(data, success, error) {
  request
    .get(config.serverUrl+'/api/v1/invoices/'+data.id)
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

export function getInvoicesService(data, success, error) {
  let page = data.page;
  if (!page) {
    page = 1;
  }
  // let code = data.code;
  request
    .get(config.serverUrl+'/api/v1/invoices')
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

export function updateInvoiceService(data, success, error) {
  request
    .put(config.serverUrl+'/api/v1/invoices/'+data.invoice.id)
    .set('Authorization', 'Bearer '+localStorage.getItem('token'))
    .set('Content-Type', 'application/json')
    .send({ invoice: data.invoice })
    .end((err, res) => {
      if (err) {
        error(err);
      } else {
        // const response = JSON.parse(res.text);
        success(null);
      }
    })
};

export function deleteInvoiceService(data, success, error) {
  request
    .delete(config.serverUrl+'/api/v1/invoices/'+data.invoice_id)
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

export default createInvoiceService