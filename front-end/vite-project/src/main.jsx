import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { SenderProvider } from "./context/SenderContext";
import "./index.css";

ReactDOM.render(
  <SenderProvider>
    <App />
  </SenderProvider>,
  document.getElementById("root"),
);