import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // We can keep this for any reset, but rely on style.css mainly
import './assets/styles/style.css'
import './assets/styles/connect_btn_theme.css'
import App from './App.jsx'
import { POSProvider } from './context/POSContext'

// Prevent window-level scroll restoration on Android/desktop browsers
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// iOS Safari uses a back-forward cache (bfcache) that restores inner
// overflow:auto element scroll positions independently of history.scrollRestoration.
// The 'pageshow' event is the ONLY event that fires for BOTH:
//   - normal page load  (e.persisted === false)
//   - iOS bfcache restore (e.persisted === true, 'load' does NOT fire)
// A single rAF after pageshow is enough — no setTimeout, no scroll listeners,
// nothing that could interfere with touch/tap gestures.
window.addEventListener('pageshow', () => {
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll(
      '.menu-section, .order-sidebar, .revenue-dashboard, #view-kitchen, #view-orders, #view-bar'
    ).forEach(el => { el.scrollTop = 0; });
  });
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <POSProvider>
      <App />
    </POSProvider>
  </StrictMode>,
)
