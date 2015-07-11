import React from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ColioApp from './ColioApp';
import * as reducers from '../reducers';
import AppRouter from '../components/AppRouter';
import History from 'react-router/lib/BrowserHistory';

injectTapEventPlugin();

const ThemeManager = new mui.Styles.ThemeManager();

const history = new History();
const redux = createRedux(reducers);

export default class App {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <Provider redux={redux}>
        {() => <AppRouter {...{ history }} />}
      </Provider>
    );
  }
}
