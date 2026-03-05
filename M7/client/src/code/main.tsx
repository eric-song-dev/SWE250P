// Import styles
import "normalize.css";
import "../css/main.css";

import React from "react";
import { createRoot } from "react-dom/client";

import BaseLayout from "./components/BaseLayout";


// Render the application
const container = document.getElementById("root") || document.body;
const root = createRoot(container);
root.render(React.createElement(BaseLayout));
