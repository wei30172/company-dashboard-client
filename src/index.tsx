import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { ModeProvider } from "./contexts/ModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "./App";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ModeProvider>
            <App />
          </ModeProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
