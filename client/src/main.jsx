import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import './index.css'
import { UserContextProvider } from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <Theme>
            <App />
          </Theme>
        </UserContextProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
