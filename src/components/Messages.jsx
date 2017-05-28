import React from 'react';

export default React.createClass({
  render: function() {
    const { messages } = this.props
    if(messages != undefined) {
      return (
        <div>
          {
            messages.map((message, index) => {
              return (<h2 key={index}>{message}</h2>);
            })
          }
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
});