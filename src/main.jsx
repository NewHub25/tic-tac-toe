import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { ringNotification } from "./components/ring-notification.jsx";
import 'animate.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
      Components={{
        ringAlert: ringNotification,
      }}
      iconVariant={{
        ringAlert: "✅",
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

// En produccion no funciona React.StrictMode, queda ignorado
// Es el causante que los efecto (useEffect) se ejecuten 2 veces (effect, cleanup, effect)
