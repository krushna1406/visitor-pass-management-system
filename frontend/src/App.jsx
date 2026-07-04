import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from './pages/Login'
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import SecurityDashboard from "./pages/SecurityDashboard"
import { useAuthContext } from "./hooks/useAuthContext"
import ProtectedRoute from "./route/protectedRoute"
import { Dashboard, CreateUser, Sidebar, User, UserList, Visitor, VisitorList } from './components/admin/Index'

function App() {

  const { user } = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Home />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path="create-user" element={<CreateUser />} />
            <Route path="users" element={<UserList />} />
            <Route path="visitors" element={<VisitorList />} />
          </Route>

          <Route path='/employee'
            element={
              <ProtectedRoute role={'employee'}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/security'
            element={
              <ProtectedRoute role={'security'}>
                <SecurityDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
