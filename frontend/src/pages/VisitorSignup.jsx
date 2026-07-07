import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import useSignup from '../hooks/useSignup'
import { ImSpinner8 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import useVisitorSignup from '../hooks/useVisitorSignup'

const VisitorSignup = () => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate()

   const { dispatch } = useAuthContext()
   const {signup, loading, error} = useVisitorSignup()

   const handleSubmit = async (e) => {
      e.preventDefault();

      const role = 'visitor';
      const userData = { name, email, phone, password, role };

      await signup(userData);
      if (!error) {
         setName('');
         setEmail('')
         setPhone('');
         setPassword('')
         navigate('/login')
      }
   }

   return (
      <>
         <div className='min-h-screen flex flex-col gap-4 items-center justify-center bg-linear-to-br from-sky-300 via-indigo-500 to-indigo-900'>
            <form
               onSubmit={handleSubmit}
               className='w-100 bg-white rounded-2xl shadow-md p-8 space-y-5'
            >
               <h2 className='text-indigo-600 font-semibold text-2xl text-center'>Sign Up</h2>


               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Name <sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-indigo-600'
               /><br />


               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Email<sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-indigo-600'
               /><br />

               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Phone<sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-indigo-600'
               /><br />


               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Password<sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-indigo-600'
               /><br />
               
               <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-amber-500 p-2 mt-2 rounded-md text-white font-semibold'
               >
                  {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto' /> : 'Sign Up'}
               </button>
            </form>
         </div>
      </>
   )
}

export default VisitorSignup