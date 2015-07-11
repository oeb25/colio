import React from 'react';
import { Route } from 'react-router';
import LandingContainer from './containers/LandingContainer';
import RoomContainer from './containers/RoomContainer';
import CreateRoom from './components/CreateRoom';

const routes = (
  <Route>
    <Route path="/" component={LandingContainer}/>
    <Route path="/room" component={CreateRoom} />
    <Route path="/room/:id" component={RoomContainer} />
  </Route>
);

export default routes;
