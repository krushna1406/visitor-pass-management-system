import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from './pages/Login'
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import SecurityDashboard from "./pages/SecurityDashboard"
import Navbar from "./components/Navbar"
import { useAuthContext } from "./hooks/useAuthContext"
import ProtectedRoute from "./route/protectedRoute"

function App() {

  const {user} = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Home />} />

          <Route path='/admin' 
          element={
            <ProtectedRoute role={'admin'}>
              <AdminDashboard/>
            </ProtectedRoute>
          } />

          <Route path='/employee' 
          element={
            <ProtectedRoute role={'employee'}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path='/security' 
          element={
            <ProtectedRoute role={'security'}>
              <SecurityDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
