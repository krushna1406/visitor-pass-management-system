import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'
import { ImSpinner8 } from 'react-icons/im'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

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
         navigate('/admin');
      }
      else if (user?.role === 'employee') {
         navigate('/employee');
      }
      else if (user?.role === 'security') {
         navigate('/security');
      }else if(user?.role === 'visitor') {
         navigate('/visitor');
      }
   }, [user, navigate])

   return (
      <div className='min-h-screen flex flex-col gap-4 items-center bg-linear-to-br from-sky-300 via-indigo-500 to-indigo-900'>
         <form
            onSubmit={handleSubmit}
            className='w-[30%] bg-white p-10 rounded-lg mt-40'
         >
            <h2 className='text-center mb-5 text-2xl text-indigo-600 font-semibold'>Login</h2>

            <label className='text-lg font-bold text-gray-600 block mb-1'>Email<sup className='p-1 text-xs font-light text-rose-500'>*</sup></label>
            <input
               type="text"
               value={email}
               placeholder='example@xyz.com'
               required
               onChange={(e) => setEmail(e.target.value)}
               className='border border-gray-300 text-gray-600 outline-indigo-700 rounded-md px-2 py-2 w-full mb-3'
            /><br />
            <label className='text-lg font-bold text-gray-600 block mb-1'>Password <sup className='text-xs font-light text-rose-500'>*</sup></label>
            <div className='relative'>
               <input
                  type={show ? "text" : 'password'}
                  value={password}
                  placeholder='************'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className='border border-gray-300 text-gray-600 outline-indigo-700 rounded-md px-2 py-2 w-full mb-3'
               />
               <button
                  type='button'
                  onClick={() => setShow(!show)}
                  className='absolute top-3 right-3 text-gray-500'
               >
                  {!show ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
               </button>
            </div>
            <button
               type='submit'
               disabled={loading}
               className='text-md font-semibold w-full h-10 mt-6 bg-amber-500 text-white px-4 py-2 rounded-lg'
            >
               {loading ? <ImSpinner8 className='animate-spin mx-auto text-md' /> : 'Login'}
            </button>

            <p className='mt-4'>
               Don't have an Account ?
               <Link to='/signup'
                  className='text-sky-500 p-2'
               >Signup</Link>
            </p>
         </form>

         {error &&
            <div className='text-red-500 font-semibold text-md rounded-md p-2'>
               {error}
            </div>
         }
      </div>
   )
}

export default Login