import React from 'react';
import { Card, Paper } from 'material-ui';
import assign from 'object-assign';
import Spring from 'react-motion';

export default class VideoListItem extends React.Component {

  constructor() {
    super();

    this.state = {
      hover: false,
      held: false,
      move: {
        x: 0,
        y: 0
      },
      start: {
        x: 0,
        y: 0
      }
    };

    this.handleMouse = this.handleMouse.bind(this);
  }

  getStyles() {
    return {
      result: {
        padding: 0,
        height: 12 * 8,
        cursor: 'hand',
        background: '#fff',
        width: '100%',
        userSelect: 'none'
      },
      thumbnail: {
        display: 'inline-block',
        float: 'left',
        width: 176
      },
      thumbnailImage: {
        margin: '0 auto',
        height: 12 * 8
      },
      title: {
        height: 12 * 8 - 12 * 2,
        float: 'left',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 12,
        overflow: 'hidden'
      }
    };
  }

  hover(io) {
    const change = {
      hover: io
    };

    this.setState(change);
  }

  handleMouse(io, e) {
    this.props.handleMouse(e, io);
    /*
    const { clientX, clientY } = e;

    if (io) {
      this.timeout = setTimeout(() => this.setState({
        held: true,
        move: {
          x: 0,
          y: 0
        },
        start: {
          x: clientX,
          y: clientY
        }
      }), 500);
    } else {
      this.setState({
        held: false,
        move: {
          x: 0,
          y: 0
        }
      });
      clearTimeout(this.timeout);
    }

    if (!this.state.held && !io) {
      this.props.onClick();
    }
    */
  }

  move(e) {
    if (this.state.held) {
      const move = {
        x: e.clientX - this.state.start.x,
        y: e.clientY - this.state.start.y
      };

      this.setState({ move });
    }
  }

  render() {
    const { item, onClick, highlight } = this.props;
    const styles = this.getStyles();

    let { title } = item;

    if (title.substr(0, 60) !== title) {
      title = title.substr(0, 35) + '...';
    }

    const left = (this.state.hover ? 6 : this.highlight ? 3 : 0) + this.state.move.x;

    const top = (this.state.held ? -3 : 0) + this.props.top * styles.result.height + this.state.move.y;

    return (
      <Spring endValue={{
        top, left,
        z: this.state.held ? 3 : this.state.hover ? 2 : this.highlight ? 1 : 0
      }}>{val =>
        <div onMouseDown={(e) => this.handleMouse(true, e)}
          onMouseUp={(e) => this.handleMouse(false, e)}
          onMouseEnter={() => this.hover(true)}
          onMouseLeave={() => this.hover(false)}
          onMouseMove={(e) => this.move(e)}
          style={{
            transform: `translate3d(${val.left}px, ${val.top}px, ${val.top}px)`,
            zIndex: Math.max(~~(val.z * 10), 1),
            position: 'absolute',
            width: '100%'
          }}
        >
          <Paper
            zDepth={Math.max(Math.ceil(val.z), 1)}
            style={assign({},
              styles.result
            )}
          >
            <div style={styles.thumbnail}>
              <img style={styles.thumbnailImage} src={item.thumbnail}/>
            </div>
            <div style={styles.title}>
              {title} - {~~(val.z * 10)}
            </div>
          </Paper>
        </div>
      }</Spring>
    );
  }

}
