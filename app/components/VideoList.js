import React from 'react';
import { Card, Paper } from 'material-ui';
import VideoListItem from './VideoListItem'

export default class VideoList extends React.Component {

  getStyles() {
    return {
    };
  }

  render() {
    const { items } = this.props;
    const styles = this.getStyles();

    return (
      <div style={{
        position: 'relative',
        height: items.length * 96 + 'px',
        width: '100%'
      }}>
        {items.map((item, i) =>
          <VideoListItem top={i} key={item.id} highlight={this.props.highlight === i}
            item={item} onClick={() => this.props.onClick(item, i)}
            handleMouse={this.props.handleMouse}
          />
        )}
      </div>
    );
  }

}
