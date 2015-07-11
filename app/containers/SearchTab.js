import React from 'react';
import { connect } from 'redux/react';
import { TextField, Snackbar } from 'material-ui';
import VideoList from '../components/VideoList';
import { ADD_VIDEO } from '../../constants/ActionConstants';
import * as SearchActions from '../actions/SearchActions';

@connect(state => ({
  search: state.search
}))
export default class SearchTab extends React.Component {

  static contextTypes = {
    socket: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      query: ''
    };
  }

  getStyles() {
    return {
      tabs: {
        padding: 12,
        position: 'relative'
      },
      input: {
        width: '100%'
      }
    };
  }

  componentDidMount() {
    this.search();
  }

  search = (e) => {
    if (e) e.preventDefault();
    const query = this.refs.query.getValue();

    this.setState({ query });

    this.props.dispatch(SearchActions.searchVideos(query));
  }

  addVideoToQueue = (video, i) => {

    this.props.goToQueue();
    this.context.socket.emit(ADD_VIDEO, video);
  }

  render() {
    const { search } = this.props;
    const styles = this.getStyles();

    return (
      <div label="Search" style={styles.tabs}>
        <form onSubmit={this.search}>
          <TextField defaultValue={"Rhye"} ref="query" style={styles.input} hintText="Search"/>
        </form>
        {this.props.children}
        <VideoList
          allowRemove={true}
          onRemove={this.removeVideoFromQueue}
          handleMouse={this.props.handleMouse}
          onClick={this.addVideoToQueue} items={search.results}/>
        {search.inprogress &&
          <Snackbar openOnMount={true} message={`Seaching for ${this.state.query}...`}/>
        }
      </div>
    );
  }

}
