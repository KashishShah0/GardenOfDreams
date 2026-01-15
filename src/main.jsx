import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // We can keep this for any reset, but rely on style.css mainly
import './assets/styles/style.css'
import './assets/styles/connect_btn_theme.css'
import App from './App.jsx'
import { POSProvider } from './context/POSContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <POSProvider>
      <App />
    </POSProvider>
  </StrictMode>,
)
