import Messages from '../components/Messages'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  messages: state.get('messages').get('list')
});

const MessagesContainer = connect(mapStateToProps, null)(Messages);
export default MessagesContainer