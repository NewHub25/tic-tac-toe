import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// En produccion no funciona React.StrictMode, queda ignorado
// Es el causante que los efecto (useEffect) se ejecuten 2 veces (effect, cleanup, effect)
