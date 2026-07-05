import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { Toaster } from 'react-hot-toast'
import { VisitorContextProvider } from './contexts/visitorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <VisitorContextProvider>
        <Toaster position='top-center' containerStyle={{ top: 5 }} />
        <App />
      </VisitorContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
