import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // We can keep this for any reset, but rely on style.css mainly
import './assets/styles/style.css'
import './assets/styles/connect_btn_theme.css'
import App from './App.jsx'
import { POSProvider } from './context/POSContext'

// Prevent the browser from restoring scroll position on refresh/back-nav
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// On page load, reset all scrollable containers after the browser has had
// its chance to restore scroll (double-rAF runs after two paint frames).
// We do NOT use setTimeouts here — they can fire during a touch interaction
// on iOS and cancel tap gestures, breaking button clicks.
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.querySelectorAll(
        '.menu-section, .order-sidebar, .revenue-dashboard, #view-kitchen, #view-orders, #view-bar'
      ).forEach(el => { el.scrollTop = 0; });
    });
  });
}, { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <POSProvider>
      <App />
    </POSProvider>
  </StrictMode>,
)
