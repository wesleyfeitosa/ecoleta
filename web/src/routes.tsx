import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Points from './pages/Points';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/create-point" component={CreatePoint} />
      <Route path="/points" component={Points} />
    </BrowserRouter>
  );
};

export default Routes;
