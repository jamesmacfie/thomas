import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import ThemeWrapper from 'containers/wrappers/theme';
import Home from './pages/home';
import View from './pages/p';
import Settings from './pages/settings';
import FourOhFour from './pages/fourOhFour';
import './styles/dist.css';
import './styles/leaflet.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

fontawesome.library.add(fab, fas, far);

const App = () => (
  <ThemeWrapper>
    <Router>
      <Switch>
        <Route exact path="/p/:id">
          <View />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  </ThemeWrapper>
);

export default App;
