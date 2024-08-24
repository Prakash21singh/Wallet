import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import WalletConnectionProvider from "./WalletConnectionProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WalletConnectionProvider>
    <App />
  </WalletConnectionProvider>
);
