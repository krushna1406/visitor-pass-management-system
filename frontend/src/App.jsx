import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {AdminDashboard, EmployeeDashboard, SecurityDashboard, VisitorDashboard, Home, Login, VisitorSignup} from './pages/index'
import { useAuthContext } from "./hooks/useAuthContext"
import ProtectedRoute from "./route/protectedRoute"
import { Dashboard, CreateUser, AllEmployees, VisitorList, AllUsers } from './components/admin/Index'
import {EmpDashboard, ScheduleVisitor, EmpVisitorList} from './components/employee/Index'
import {SecDashboard, CheckIn, CheckOut} from './components/security/index'
import {VisDashboard} from './components/visitor/index'

function App() {

  const { user } = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<VisitorSignup/>}/>
          <Route path='/' element={<Home />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role={'admin'}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='dashboard' />} />
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="create-user" element={<CreateUser />} />
            <Route path="employees" element={<AllEmployees />} />
            <Route path="visitors" element={<VisitorList />} />
            <Route path="users" element={<AllUsers />} />
          </Route>

          {/* Employee Routes  */}
          <Route 
            path='/employee'
            element={
              <ProtectedRoute role={'employee'}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='dashboard'/>}/>
            <Route path="dashboard" element={<EmpDashboard/>}/>
            <Route path="invite-visitor" element={<ScheduleVisitor/>}/>
            <Route path="my-visitors" element={<EmpVisitorList/>}/>
          </Route>

          {/* Security Routes */}
          <Route path='/security'
            element={
              <ProtectedRoute role={'security'}>
                <SecurityDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='dashboard'/>}/>
            <Route path="dashboard" element={<SecDashboard/>}/>
            <Route path="check-in" element={<CheckIn/>}/>
            <Route path="check-out" element={<CheckOut/>}/>
          </Route>

          {/* Visitor Routes */}
          <Route path='/visitor'
            element={
              <ProtectedRoute role={'visitor'}>
                <VisitorDashboard/>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='dashboard'/>}/>
            <Route path='dashboard' element={<VisDashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
