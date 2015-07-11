import React from 'react';
import { Link } from 'react-router';

function Navigation(a) {
  a.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  return a;
}

@Navigation
export default class CreateRoom extends React.Component {
  componentDidMount() {
    this.context.router.transitionTo('room/123');
  }

  render() {
    return (
      <div>
        <Link to="room/123">Hello</Link>
      </div>
    );
  }

}
