import React, { useState, useEffect } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'
import { ImSpinner8 } from 'react-icons/im'

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [show, setShow] = useState(false);

   const { login, loading, error } = useLogin();
   const { user } = useAuthContext()

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      await login(email, password);
   }

   useEffect(() => {
      if (user?.role === 'admin') {
         navigate('/admin')
      } else if (user?.role === 'employee') {
         navigate('/employee')
      }
      else if (user?.role === 'security') {
         navigate('/security')
      }
   }, [user, navigate])

   return (
      <>
         <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label >Email<sup>*</sup></label>
            <input
               type="text"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className=''
            />
            <input
               type={show ? "text" : 'password'}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className=''
            />
            <button
               type='submit'
               disabled={loading}
               className='bg-amber-400 px-4 py-2'
            >
               {loading ? <ImSpinner8 className='animate-spin' /> : 'Login'}
            </button>
         </form>

         {error &&
            <div className='text-red-500 text-lg'>
               {error}
            </div>
         }
      </>
   )
}

export default Login