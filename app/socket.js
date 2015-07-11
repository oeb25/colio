import React from 'react';
import assign from 'object-assign';
import io from 'socket.io-client';

export default function Socket(url) {
  return (Component) => {
    return class Socket {
      static childContextTypes = {
        socket: React.PropTypes.object
      };

      componentWillMount() {
        this.socket = io(url);
      }

      getChildContext() {
        return {
          socket: this.socket
        };
      }

      render() {
        return <Component socket={this.socket} {...this.props} />;
      }
    };
  };
}
