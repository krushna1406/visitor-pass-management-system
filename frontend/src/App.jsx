import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import SecurityDashboard from "./pages/SecurityDashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<AdminDashboard/>}/>
          <Route path='/employee' element={<EmployeeDashboard/>}/>
          <Route path='/security' element={<SecurityDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
