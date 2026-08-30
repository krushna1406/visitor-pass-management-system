import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useVisitorSignup from '../hooks/useVisitorSignup'
import { ImSpinner8 } from 'react-icons/im'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

const VisitorSignup = () => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');
   const [show, setShow] = useState(false);

   const [otp, setOtp] = useState('');
   const [otpSent, setOtpSent] = useState(false);
   const navigate = useNavigate()
   const { verifyEmail, signup, loading, error } = useVisitorSignup()

   const handleSubmit = async (e) => {
      e.preventDefault();

      if(!otpSent) {
         const role = 'visitor';
         const userData = { name, email, phone, password, role };

         const success = await verifyEmail(userData);
         if(success) {
            setOtpSent(true);
         }
      } else{
         await signup(email, otp);
         navigate('/visitor');
      }
   }

   return (
      <>
         <div className='min-h-screen flex flex-col gap-4 items-center justify-center bg-linear-to-br from-sky-300 via-blue-500 to-blue-900'>
            <form
               onSubmit={handleSubmit}
               className='w-[90%] sm:w-[70%] md:w-100 bg-white rounded-2xl shadow-md p-5 md:p-8 space-y-5'
            >
               <h2 className='text-blue-600 font-semibold text-2xl text-center'>Sign Up</h2>


               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Name <sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-blue-600'
               /><br />


               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Email<sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-blue-600'
               /><br />

               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Phone<sup className='text-red-500'>*</sup>
               </label>
               <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                  className='w-full border rounded border-gray-300 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-blue-600'
               /><br />


               <label className='block mb-1 text-md font-medium text-gray-600'>
                  Password<sup className='text-red-500'>*</sup>
               </label>
               <div className='relative mb-0'>
                  <input
                     type={show ? "text" : 'password'}
                     value={password}
                     placeholder='************'
                     required
                     onChange={(e) => setPassword(e.target.value)}
                     className='border border-gray-300 text-gray-600 outline-blue-700 rounded-md px-2 py-2 w-full mb-3'
                  />
                  <button
                     type='button'
                     onClick={() => setShow(!show)}
                     className='absolute top-3 right-3 text-gray-500'
                  >
                     {!show ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
               </div>

               {otpSent ? (
                  <>
                     <label className='text-md text-green-500'>
                        OTP sent to email successfully
                     </label>
                     <input type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder='Enter 6-digit OTP'
                        maxLength={6}
                        required
                        className='border border-gray-300 text-gray-600 outline-blue-700 rounded-md px-2 py-2 w-full my-3'
                     />
                     <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-amber-500 p-2 mt-2 rounded-md text-white font-semibold'
                     >
                        {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto' /> : 'Sign Up'}
                     </button>
                  </>
               ) : (
                  <button
                     type='submit'
                     disabled={loading}
                     className='w-full bg-amber-500 p-2 mt-2 rounded-md text-white font-semibold'
                  >
                     {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto' /> : 'Send OTP'}
                  </button>
               )
               }

               <p>
                  Already have an Account ?
                  <Link to='/login'
                     className='text-sky-500 px-2 hover:underline'
                  >Login</Link>
               </p>
            </form>

            {error &&
               <div className='text-red-500 font-semibold text-md rounded-md p-2'>
                  {error}
               </div>
            }
         </div>
      </>
   )
}

export default VisitorSignup