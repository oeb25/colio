import React from 'react';
import { Link } from 'react-router';
import Spring from 'react-motion';
import MoveableList from './MoveableList';

export default class Landing extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      videos: [
        'Hello',
        'There',
        'Lucas'
      ]
    };
    console.clear();
  }

  render() {
    const { joinRoom } = this.props;

    return (
      <div>
        Landing has been renderd
        <Link to="/room">Room</Link>
        <button onClick={() => this.setState({
          videos: [Math.floor(Math.random() * 1000000000).toString(32), ...this.state.videos]
        })}>Join Room</button>

        <MoveableList onMove={(video, key, to) => console.log(video, i, to)}>
          {this.state.videos.map(video =>
            <div style={{
              border: '1px solid red',
              padding: '10px'
            }} key={video}>{video}</div>)}
        </MoveableList>

        <ul onMove={(video, key, to) => console.log(video, i, to)}>
          {this.state.videos.map(video =>
            <div style={{
              border: '1px solid red',
              padding: '10px'
            }} key={video}>{video}</div>)}
        </ul>
      </div>
    );
  }

}
