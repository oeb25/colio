import React from 'react';
import VideoList from '../components/VideoList';

export default class QueueTab extends React.Component {

  static propTypes = {
    search: React.PropTypes.object.isRequired,
    videos: React.PropTypes.object.isRequired,
    current: React.PropTypes.object.isRequired,
    setVideo: React.PropTypes.func.isRequired
  }

  getStyles() {
    return {
      tabs: {
        padding: 12
      },
      input: {
        width: '100%'
      }
    };
  }

  render() {
    const { search, videos, current } = this.props;
    const styles = this.getStyles();

    return (
      <div style={styles.tabs}>
        {videos.length ?
            <VideoList highlight={current} onClick={this.changeVideo}
              items={videos}/>
          :
            <p>Please search for videos to add to the queue</p>
        }
      </div>
    );
  }

  changeVideo = (video, i) => {
    this.props.setVideo(i);
  }

}
