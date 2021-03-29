import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter } from 'react-router-dom';
import configureStore from "./app/store"

// const store = configureStore();
ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore}>
    <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
