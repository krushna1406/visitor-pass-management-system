import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { Toaster } from 'react-hot-toast'
import { VisitorContextProvider } from './contexts/visitorContext.jsx'
import { UserContextProvider } from './contexts/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <VisitorContextProvider>
          <Toaster position='top-center' containerStyle={{ top: 5 }} />
          <App />
        </VisitorContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
