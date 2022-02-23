import "bootstrap/dist/css/bootstrap.min.css";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from "react";
import ReactDOM from "react-dom";
// Redux
// https://github.com/rt2zz/redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import * as _redux from "./setup";
import store, { persistor } from "./setup/redux/Store";
// Axios
import axios from "axios";
import { Chart, registerables } from "chart.js";

// Apps
import { App } from "./app/App";
import "./theme/assets/sass/style.css";
import "./theme/assets/sass/custom.scss";
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;
/**
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store);

Chart.register(...registerables);

ReactDOM.render(
  <Provider store={store}>
    {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
    <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
      <App basename={PUBLIC_URL} />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
