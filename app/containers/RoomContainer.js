import React from 'react';
import { connect } from 'redux/react';
import Room from '../components/Room';
import * as RoomActions from '../actions/RoomActions';
import { bindActionCreators } from 'redux';
import Socket from '../socket';
import { ROOM_UPDATE } from '../../constants/ActionConstants';

@Socket(`//${window.location.hostname}:3001`)
@connect(state => ({
  room: state.room
}))
export default class RoomContainer extends React.Component {

  static contextTypes = {
    socket: React.PropTypes.object
  }

  componentDidMount() {
    if (!this.props.room) {
      this.props.dispatch(RoomActions.joinRoom(this.props.params.id));

      this.props.socket.on(ROOM_UPDATE, this.props.dispatch);
    }
  }

  componentWillUpdate() {
    console.log('shit..');
  }

  render() {
    const { dispatch, room } = this.props;
    const { id } = this.props.params;

    return (
      <div>
        {room ?
          <Room room={room} dispatch={dispatch} {...bindActionCreators(RoomActions, dispatch)} />
        :
          <h1>
            Joining room, just a second.
          </h1>
        }
      </div>
    );
  }

}
