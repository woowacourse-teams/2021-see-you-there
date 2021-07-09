import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavBar } from './components';

export const App = () => {
  return (
    <Router>
      <NavBar>
      </NavBar>
    </Router>
  );
};

