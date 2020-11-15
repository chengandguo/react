import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.js";
import { PersistGate } from "redux-persist/lib/integration/react";

// 
import '@alifd/next/dist/next.css';

// import vConsole from "vconsole";
// if(process.env.NODE_ENV === "development") {
//   new vConsole();
// }

hot(App);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={ persistor }>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
