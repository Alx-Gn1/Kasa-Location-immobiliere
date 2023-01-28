import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import { ThemeProvider } from "./utils/context/context";
import RouterLayout from "./components/Router";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    // <ThemeProvider>
      <RouterLayout />
    // </ThemeProvider>
  // </React.StrictMode>
);

reportWebVitals();
