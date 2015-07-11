import React from 'react';
import assign from 'object-assign';
import Spring from 'react-motion';
import MoveableListItem from './MoveableListItem'

export default class MoveableList extends React.Component {
  constructor() {
    super();
    this.height = 0;
  }

  getStyles() {
    return {
      list: {
        position: 'relative'
      },
      item: {
        position: 'absolute'
      }
    };
  }

  componentDidUpdate() {
    if (this.height) return true;

    const { children } = this.props;

    this.height = this.refs.height.getDOMNode().clientHeight;
  }

  handleMouse(e, i) {
  }

  render() {
    const { children } = this.props;
    const styles = this.getStyles();

    if (!this.height) {
      setTimeout(() => this.forceUpdate(), 10);
    }

    return (
      <ul style={styles.list}>
        {children.map((content, i) =>
            <MoveableListItem top={i * this.height} left={0}
              key={content.key} handleMouse={(e, i) => this.handleMouse(e, i)}>
              {content}
            </MoveableListItem>
        )}

        <div ref="height" style={{
          display: this.height ? 'none' : 'block',
          position: 'absolute'
        }}>
          {children[0]}
        </div>

        <Spring endValue={{ height: this.height * this.props.children.length }}>{({height}) =>
          <div style={{
            height,
            border: '1px solid blue'
          }}>
          </div>
        }</Spring>
      </ul>
    );
  }
}
