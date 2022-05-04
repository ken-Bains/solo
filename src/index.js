import React from "react";
import { createRoot } from 'react-dom/client';
import App from './client/App.js'
import styles from './client/scss/App.scss'

if (module.hot) {
    module.hot.accept()
}

createRoot(document.getElementById('root')).render(<App />)
