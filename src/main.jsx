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

// Force every overflow container back to the top after page load.
// Different phones/browsers restore inner-element scroll at different times
// (some after rAF, some after 100ms, some after 300ms on slow devices).
// We fire resets at every stage to guarantee one of them wins.
const resetAllScroll = () => {
  window.scrollTo(0, 0);
  document.querySelectorAll(
    '.view-section, .menu-section, .order-sidebar, .revenue-dashboard, #view-kitchen, #view-orders, #view-bar'
  ).forEach(el => { el.scrollTop = 0; });
};

window.addEventListener('load', () => {
  requestAnimationFrame(() => {           // frame 1 — after first paint
    requestAnimationFrame(() => {         // frame 2 — after browser scroll restore
      resetAllScroll();
    });
  });
  setTimeout(resetAllScroll, 100);        // 100 ms — mid-range Androids
  setTimeout(resetAllScroll, 300);        // 300 ms — slow / budget phones
}, { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <POSProvider>
      <App />
    </POSProvider>
  </StrictMode>,
)
