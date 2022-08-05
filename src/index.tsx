import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ModeProvider } from "./contexts/ModeContext";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModeProvider>
          <App />
        </ModeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
