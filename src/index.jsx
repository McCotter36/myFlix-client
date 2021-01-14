import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Alert, Container } from "react-bootstrap";
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        < MainView />
      </Provider>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);