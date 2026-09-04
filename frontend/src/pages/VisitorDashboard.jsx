import { useEffect, useState } from 'react'
import Sidebar from '../components/visitor/Sidebar'
import useLogout from '../hooks/useLogout'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { Menu, X, LogOut } from 'lucide-react'

const VisitorDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutsidde = (e) => {
      setShowProfile(false);
    }
    document.addEventListener('click', handleClickOutsidde);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsidde);
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='min-h-screen md:grid md:grid-cols-[1fr_4fr] bg-gray-100'>

      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:w-auto md:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 md:hidden'>
          <span className='text-lg font-bold text-slate-800'>Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600'
            aria-label='Close sidebar'
          >
            <X size={22} />
          </button>
        </div>
        <Sidebar />
      </div>

      <div>
        <header className='h-15 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow'>

          <button
            className='md:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2'
            onClick={() => setSidebarOpen(true)}
            aria-label='Open sidebar'
          >
            <Menu size={24} />
          </button>

          <h1 className='text-lg md:text-2xl font-semibold text-gray-600'>Visitor Dashboard</h1>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(prev => !prev)
            }}
            className='relative'
          >
            <p className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer'>{user.email.charAt(0).toUpperCase()}</p>

            {showProfile &&
              <div
                className='absolute right-0 top-12 w-60 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50'
              >
                <p className="text-lg text-blue-500 capitalize">
                  {user.role}
                </p>
                <p className="text-sm text-gray-900 overflow-hidden break-all mt-1">{user.email}</p>
                <hr className="my-3 text-blue-300" />

                <button
                  onClick={handleLogout}
                  className="w-full flex gap-2 pl-8 hover:bg-red-50 text-red-500 rounded-sm py-2"
                >
                  <LogOut size={18} className='translate-y-0.5' />Logout
                </button>
              </div>
            }
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default VisitorDashboard