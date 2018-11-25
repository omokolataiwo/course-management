import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Course from './components/course/Index';
import PageNotFound from './components/containers/PageNotFound';

const App = () => (
  <div className="container-fluid">
    <Switch>
      <Route path="/course" component={Course} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/404" component={PageNotFound} />
      <Route path="/" exact component={Home} />
      <Redirect to="/404" />
    </Switch>
  </div>
);

export default App;
