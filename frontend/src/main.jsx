import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import AutherProvider from "./Components/Contexts/Auth/AutherProvider.jsx";
import SetProvider from "./Components/Contexts/SetContexts/SetProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <AutherProvider>
      <SetProvider>
        <App />
      </SetProvider>
    </AutherProvider>
  </Router>
);
