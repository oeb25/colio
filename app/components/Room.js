import React from 'react';
import SearchTab from '../containers/SearchTab'
import QueueTab from '../components/QueueTab'
import Player from '../components/Player'
import { Tabs, Tab, Card, RaisedButton } from 'material-ui';
import Radium from 'radium';
import assign from 'object-assign';
import { Link } from 'react-router';
import RoomInterface from './RoomInterface';

export default class Room extends React.Component {

  static contextTypes = {
    socket: React.PropTypes.object
  }

  getStyles() {
    return {
      container: {
        padding: 12,
        border: '1px solid blue'
      },
      leaveButton: {
        float: 'right'
      },
      tabs: {
        marginBottom: 12,
        width: `${100}%`,
        height: 808,
        border: '1px solid pink'
      },
      player: {
        marginBottom: 12,
        width: `${100}%`
      },
      cards: {
        width: '100%',
        height: 'auto',
        display: 'block'
      },
      section: {
        display: 'block',
        width: '100%'
      }
    };
  }

  render() {
    const { leaveRoom, dispatch, room } = this.props;
    const styles = this.getStyles();

    console.log(this.context.socket);

    this.context.socket.emit('subscribe', 'room');

    return (
      <Card style={styles.container}>
        <h1>Room: {room.id}</h1>
        <div style={styles.cards}>
          <Card style={assign({}, styles.section, styles.player)}>
            <Player video={room.videos[room.current]}/>
          </Card>
          <RoomInterface dispatch={dispatch} room={room}/>
        </div>
        <Link to="/">
          <RaisedButton style={styles.leaveButton} label="Leave Room"/>
        </Link>
      </Card>
    );
  }

}
