import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/Router'
import { AuthProvider } from './context/AuthContext'
import "./styles/index.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* contiene useAuth(useContex) {user, login,logout} */}
      <RouterApp />{/* contiene todas las / rutas */}
    </AuthProvider>{/* contiene useAuth(useContex) {user, login,logout} */}
  </StrictMode>,
)
