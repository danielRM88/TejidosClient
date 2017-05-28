export const GET_STOCKS_REQUEST = 'GET_STOCKS_REQUEST'
export const GET_STOCKS_SUCCESS = 'GET_STOCKS_SUCCESS'
export const GET_STOCKS_FAILURE = 'GET_STOCKS_FAILURE'

export function getStocksRequest(page) {
  return {
    type: GET_STOCKS_REQUEST,
    loading: true,
    page
  }
}

export function getStocksSuccess(response) {
  return {
    type: GET_STOCKS_SUCCESS,
    stocks: response.stocks,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    loading: false
  }
}

export function getStocksFailure(message) {
  return {
    type: GET_STOCKS_FAILURE,
    loading: false,
    message
  }
}