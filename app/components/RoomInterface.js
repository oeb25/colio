import React from 'react';
import { Card, Tabs, Tab } from 'material-ui';
import SearchTab from '../containers/SearchTab';
import QueueTab from '../components/QueueTab';
import assign from 'object-assign';
import shallowEqual from 'redux/lib/utils/shallowEqual';

export default class RoomInterface extends React.Component {

  constructor() {
    super();

    this.handleMouse = this.handleMouse.bind(this);

    this.state = {
      start: {
        x: 0,
        y: 0
      },
      move: {
        x: 0,
        y: 0
      },
      held: false,
      down: false
    };
  }

  getStyles() {
    return {
      tabs: {
        marginBottom: 12,
        width: `${100}%`,
        height: 808
      },
      section: {
        display: 'block',
        width: '100%'
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //return !shallowEqual(this.state, nextState);
    return true;
  }

  getListeners() {
    return {
      onMouseMove: (e) => {
        if (!this.state.held) return;

        this.setState({
          move: {
            x: e.clientX,
            y: e.clientY
          }
        });
      },

      onMouseUp: () => this.setState({
        down: false,
        held: false
      }),
      onMouseLeave: () => this.setState({
        down: false,
        held: false
      })
    };
  }

  handleMouse(e, down) {
    this.setState({
      down, start: {
        x: e.clientX,
        y: e.clientY
      }
    });

    if (!down || this.state.held) return;

    this.timeout = setTimeout(() => this.setState({ held: true }), 500);
  }

  render() {
    const { dispatch, room } = this.props;
    const styles = this.getStyles();

    if (this.timeout && !this.state.down) {
      clearTimeout(this.timeout);
      this.timeout = void(0);
    }

    if (this.refs.search) {
      var { offsetTop, offsetLeft, offsetParent } = this.refs.search.getDOMNode();
      console.dir(this.refs.search.getDOMNode().parentElement);
    }

    return (
      <Card style={styles.tabs} {...this.getListeners()}>
        {this.refs.search &&
        <div style={{
          //transform: `translate3d(${offsetLeft}px, ${0}px, 0)`,
          width: 10,
          height: 10,
          background: 'red',
          zIndex: 1000000,
          position: 'absolute'
        }}></div>}
        <Tabs ref="tabs">
          <Tab label="Search">
            <SearchTab handleMouse={this.handleMouse} goToQueue={() =>
                this.refs.tabs.setState({
                  selectedIndex: 1
                })}
            >
              <div ref="search" style={{
                border: '1px solid red'
              }}/>
            </SearchTab>
          </Tab>
          <Tab label="Queue">
            <QueueTab {...room} />
          </Tab>
        </Tabs>
      </Card>
    );
  }
}
