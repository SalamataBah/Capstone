import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MapContextProvider } from "./contexts/MapContext";
import App from "./components/App/App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MapContextProvider>
        <App />
      </MapContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
