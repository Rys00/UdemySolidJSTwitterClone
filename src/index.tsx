import { render } from "solid-js/web";
import App from "./App";

import "./index.css";
import { Router } from "@solidjs/router";
import AppRoutes from "./router";

render(
  () => (
    <Router root={App}>
      <AppRoutes />
    </Router>
  ),
  document.getElementById("root")!
);
