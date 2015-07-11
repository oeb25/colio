import React from 'react';
import { connect } from 'redux/react';
import Landing from '../components/Landing';
import * as RoomActions from '../actions/RoomActions';
import { bindActionCreators } from 'redux';

@connect(state => ({
  room: state.room
}))
export default class LandingContainer extends React.Component {

  render() {
    const { dispatch } = this.props;

    return (
      <Landing {...bindActionCreators(RoomActions, dispatch)}/>
    );
  }

}
