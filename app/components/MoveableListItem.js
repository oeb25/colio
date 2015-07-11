import React from 'react';
import assign from 'object-assign';
import Spring from 'react-motion';

export default class MoveableListItem extends React.Component {
  constructor() {
    super();
  }

  getStyles() {
    return {
      item: {
        position: 'absolute'
      }
    };
  }

  render() {
    const { key, top, left, handleMouse, children } = this.props;
    const styles = this.getStyles();

    return (
      <Spring key={key} endValue={{  top, left }}>{({top, left}) =>
        <div onMouseDown={e => handleMouse(e, this)}
          style={assign({},
            styles.item,
            {
              transform: `translate3d(${left}, ${top}px, 0)`,
              zIndex: Math.min(Math.round(top * 10), 1)
            }
          )}
        >
          {children}
        </div>
      }</Spring>
    );
  }
}
