import Messages from '../components/Messages'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  message: state.get('messages').get('message')
});

const MessagesContainer = connect(mapStateToProps, null)(Messages);
export default MessagesContainer