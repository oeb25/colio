import React from 'react';
import { Card, Paper } from 'material-ui';
import YouTube from 'react-youtube';

export default class Player extends React.Component {

  constructor() {
    super();
    this.state = {
      height: 0
    };
  }

  getStyles() {
    return {
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    this.setState({
      height: this.refs.container.getDOMNode().clientWidth * (9 / 16)
    });
  }

  render() {
    const { items } = this.props;
    const styles = this.getStyles();

    return (
      <div ref="container" style={{
        height: this.state.height
      }}>
        <YouTube url={`http://www.youtube.com/watch?v=${this.props.video.id || 'TOhj2mfO9kg'}`} opts={{
          width: '100%',
          height: '100%'
        }} />
      </div>
    );
  }

}
