import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import ContextProvider from './contextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
