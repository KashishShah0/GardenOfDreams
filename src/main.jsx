import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // We can keep this for any reset, but rely on style.css mainly
import './assets/styles/style.css'
import './assets/styles/connect_btn_theme.css'
import App from './App.jsx'
import { POSProvider } from './context/POSContext'

// Prevent the browser from restoring scroll position on refresh/back-nav
// so the app always opens at the top of the scrollable container
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Mobile Chrome restores inner overflow:auto scroll AFTER React renders AND
// after the load event fires, so we use a double-rAF to guarantee we run
// after the browser has finished its own scroll restoration.
const resetAllScroll = () => {
  window.scrollTo(0, 0);
  document.querySelectorAll('.view-section, .menu-section, .order-sidebar').forEach(el => {
    el.scrollTop = 0;
  });
};

window.addEventListener('load', () => {
  // Frame 1: browser finishes layout/scroll restore
  requestAnimationFrame(() => {
    // Frame 2: we beat any final async scroll adjustments
    requestAnimationFrame(resetAllScroll);
  });
}, { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <POSProvider>
      <App />
    </POSProvider>
  </StrictMode>,
)
