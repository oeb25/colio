import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import { Snackbar } from 'material-ui';
import RoomContainer from '../containers/RoomContainer';
import LandingContainer from '../containers/LandingContainer';
import * as RoomActions from '../actions/RoomActions';

@connect(state => ({
  isInRoom: !!state.room
}))
export default class ColioApp {
  render() {
    const { isInRoom, dispatch } = this.props;

    return (
      <div>
        {isInRoom ?
          <RoomContainer />
          :
          <LandingContainer />
        }
      </div>
    );
  }
}
