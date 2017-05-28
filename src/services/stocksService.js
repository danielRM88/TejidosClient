var config = require('config');
import request from 'superagent';

export function getStocksService(data, success, error) {
  let page = data.page;
  if (!page) {
    page = 1;
  }
  request
    .get(config.serverUrl+'/api/v1/stocks')
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

export default getStocksService