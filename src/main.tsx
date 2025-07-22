import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Initialize the Convex client
console.log('Convex URL:', import.meta.env.VITE_CONVEX_URL)
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)
console.log('Convex client initialized:', convex)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>,
)