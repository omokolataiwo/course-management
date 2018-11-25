import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'notie/dist/notie.css';
import App from './App';
import './animate.css';
import './style.css';
import { fetchAllCourses } from './actions/course';
import { PAGE_SIZE } from './const';
import { fetchAllAuthors } from './actions/author';

const store = configStore();
store.dispatch(fetchAllCourses(1, PAGE_SIZE));
store.dispatch(fetchAllAuthors());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter
      getUserConfirmation={(message, callback) => {
        const showModal = window[Symbol.for(message)];

        if (showModal) {
          return showModal(callback);
        }
        return callback(true);
      }}
    >
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
