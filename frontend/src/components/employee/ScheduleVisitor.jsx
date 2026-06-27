import React, { useState } from 'react'
import { createVisitor } from '../../services/api'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ImSpinner8 } from 'react-icons/im'
import toast from 'react-hot-toast'

const ScheduleVisitor = () => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [purpose, setPurpose] = useState('');
   const [loading, setLoading] = useState(false);

   const { user } = useAuthContext();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const visitorData = {
            name,
            email,
            phone,
            purpose,
            employee: user._id
         };

         const result = await createVisitor(visitorData);
         if (result.success) {
            toast.success('Visitor scheduled successfully!');
            setName('');
            setEmail('');
            setPhone('');
            setPurpose('');
         }
      } catch (error) {
         toast.error(error.response?.data?.message || 'Failed to schedule visitor');
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <div className='flex justify-center items-center min-h-[80vh] px-4'>
            <form
               onSubmit={handleSubmit}
               className='w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-5'
            >
               <h2 className='text-purple-500 font-semibold text-2xl text-center'>Schedule Visitor</h2>

               <div>
                  <label className='block mb-1 text-md font-medium text-gray-600'>
                     Name <sup className='text-red-500'>*</sup>
                  </label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder='Enter visitor name'
                     required={true}
                     className='w-full border rounded border-gray-400 text-gray-700 px-3 py-2 focus:outline-2 focus:outline-purple-400'
                  />
               </div>

               <div>
                  <label className='block mb-1 text-md font-medium text-gray-600'>
                     Email <sup className='text-red-500'>*</sup>
                  </label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder='Enter visitor email'
                     required={true}
                     className='w-full border rounded border-gray-400 text-gray-700 px-3 py-2 focus:outline-2 focus:outline-purple-400'
                  />
               </div>

               <div>
                  <label className='block mb-1 text-md font-medium text-gray-600'>
                     Phone <sup className='text-red-500'>*</sup>
                  </label>
                  <input
                     type="tel"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder='Enter phone number'
                     required={true}
                     className='w-full border rounded border-gray-400 text-gray-700 px-3 py-2 focus:outline-2 focus:outline-purple-400'
                  />
               </div>

               <div>
                  <label className='block mb-1 text-md font-medium text-gray-600'>
                     Purpose <sup className='text-red-500'>*</sup>
                  </label>
                  <select
                     value={purpose}
                     onChange={(e) => setPurpose(e.target.value)}
                     required={true}
                     className='w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-700'
                  >
                     <option value=''>~Select Purpose~</option>
                     <option value='meeting'>Meeting</option>
                     <option value='interview'>Interview</option>
                     <option value='advertisements'>Advertisements</option>
                     <option value='personal'>Personal</option>
                     <option value='other'>Other</option>
                  </select>
               </div>

               <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-purple-400 hover:bg-purple-500 p-2 rounded-md text-white transition-colors duration-200'
               >
                  {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto' /> : 'Schedule Visit'}
               </button>
            </form>
         </div>
      </>
   )
}

export default ScheduleVisitor
