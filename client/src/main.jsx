import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material'
import { initializeApp } from 'firebase/app'

import app from './firebaseConfig.js'
import theme from './theme.js'

import './main.css'
// import './scrollbar.css'

initializeApp(app)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
