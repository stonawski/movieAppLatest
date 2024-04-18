import React from "react";
import ReactDOM from "react-dom/client";
// import Home from "./Home.jsx";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
