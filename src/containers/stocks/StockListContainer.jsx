import StockList from '../../components/stocks/StockList'
import { deleteStock, getStocksRequest } from '../../actions/stocksActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const stocks = state.get('stocks');
  const loading = stocks.get('loading');
  const list = stocks.get('list');

  let stockList = [];
  let totalPages = 1;
  let currentPage = 1;
  if(list !== undefined) {
    stockList = list.get('stocks');
    totalPages = list.get('totalPages');
    currentPage = list.get('currentPage');
  }

  return ({
    loading,
    list: stockList,
    totalPages,
    currentPage
  })
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteClick(stock_id) {
    dispatch(deleteStock(stock_id));
  },
  onPageClick(page) {
    dispatch(getStocksRequest(page));
  }
});

const StockListContainer = connect(mapStateToProps, mapDispatchToProps)(StockList);
export default StockListContainer;