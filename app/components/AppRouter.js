import React from 'react';
import Router from 'react-router';
import routes from '../routes';

export default class AppRouter {
  render() {
    return (
      <div>
        <Router {...this.props}>
          {routes}
        </Router>
      </div>
    );
  }
}
