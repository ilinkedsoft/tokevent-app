import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

const Header = React.lazy(() => import('./components/header'));
const Footer = React.lazy(() => import('./components/footer'));
const EventList = React.lazy(() => import('./module/events'));
const About = React.lazy(() => import('./module/about'));

function App() {
  return (
    <React.StrictMode>
      <Suspense fallback={<div>Loading events...</div>}>
        <Provider store={store}>
          <Router>
            <Header />
            <Switch>
              <Route path="/events">
                <EventList />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Redirect to="/events" />
            </Switch>
            <Footer />
          </Router>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
