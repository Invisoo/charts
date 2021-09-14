import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'react-input-range/lib/css/index.css';

import './App.css';

import InterestSimulator from './pages/InterestSimulator.js';
import RetirementCalculator from './pages/RetirementCalculator.js';
import AmortizationCalculator from './pages/AmortizationCard.js';
import Procrastination from './pages/Procrastination.js';
import SocialSecurity from './pages/SocialSecurity.js';

const App = () => (
  <Router>
    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
    <Switch>
      <Route path="/" exact>
        <InterestSimulator />
      </Route>
      <Route path="/interests">
        <InterestSimulator />
      </Route>
      <Route path="/amortization">
        <AmortizationCalculator />
      </Route>
      <Route path="/retirement_calc">
        <RetirementCalculator />
      </Route>
      <Route path="/procrastination">
        <Procrastination />
      </Route>
      <Route path="/ssa">
        <SocialSecurity />
      </Route>
      <Route path="/">
        <Page404 />
      </Route>
    </Switch>
  </Router>
)

const Page404 = () => (
  <Container><Row><Col>
    <h1>Error 404</h1>
  </Col></Row></Container>
)

export default App;
