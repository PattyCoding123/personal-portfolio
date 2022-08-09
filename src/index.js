import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from "./reportWebVitals"


// Connect React App to the div in index.html
const root = ReactDOM.createRoot(document.getElementById("root"))

// Got rid of strict mode as it prevented tooltips from
// disappearing once they were hovered over.
root.render(
  <App />
)

reportWebVitals()