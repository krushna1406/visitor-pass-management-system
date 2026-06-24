import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import SecurityDashboard from "./pages/SecurityDashboard"
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' 
            element={
              <ProtectedRoute role='admin'>
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />

          <Route path='/employee' 
            element={
              <ProtectedRoute role='employee'>
                <EmployeeDashboard/>
              </ProtectedRoute>
            }
          />

          <Route path='/security' 
            element={
              <ProtectedRoute role='security'>
                <SecurityDashboard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
