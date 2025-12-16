import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import { Provider } from "react-redux"
import travelBuddyStore from "./store/travelBuddyStore"
import { ThemeProvider } from "./components/ThemeContext";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={travelBuddyStore}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);