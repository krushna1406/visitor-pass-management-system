import React, { useState } from 'react'
import { createVisitor } from '../../services/api'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ImSpinner8 } from 'react-icons/im'
import toast from 'react-hot-toast'

const ScheduleVisit = () => {

   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [employee, setEmployee] = useState('');
   const [purpose, setPurpose] = useState('');
   const [date, setDate] = useState('');
   const [loading, setLoading] = useState(false);

   const { user } = useAuthContext();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const selected = new Date(date);
      const today = new Date();

      if(selected < today) {
         toast.error('Cannot schedule visit for past dates');
         setLoading(false);
         return;
      }
      try {
         const visitorData = {
            name,
            email: user.email,
            phone,
            purpose,
            employee,
            visitDate: date
         };

         const result = await createVisitor(visitorData);
         if (result.success) {
            toast.success('Visitor scheduled successfully!');
            setName('');
            setPhone('');
            setEmployee('');
            setPurpose('');
            setDate('');
         }
      } catch (error) {
         toast.error(error.response?.data?.message || 'Failed to schedule visito');
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <div className='flex justify-center items-center min-h-[90vh] px-4'>
            <form
               onSubmit={handleSubmit}
               className='w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-2'
            >
               <h2 className='text-indigo-600 font-semibold text-2xl text-center'>Schedule Visitor</h2>

               <div>
                  <label className='block mb-1 text-sm font-medium text-gray-600'>
                     Name <sup className='text-red-500'>*</sup>
                  </label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required={true}
                     className='w-full border rounded-md border-gray-300 text-gray-700 px-2 py-1 focus:outline-2 focus:outline-indigo-400'
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
                     required={true}
                     className='w-full border rounded-md border-gray-300 text-gray-700 px-2 py-1 focus:outline-2 focus:outline-indigo-400'
                  />
               </div>

               <div>
                  <label className='block mb-1 text-md font-medium text-gray-600'>
                     Employee ID <sup className='text-red-500'>*</sup>
                  </label>
                  <input
                     type="tel"
                     value={employee}
                     onChange={(e) => setEmployee(e.target.value)}
                     required={true}
                     className='w-full border rounded-md border-gray-300 text-gray-700 px-2 py-1 focus:outline-2 focus:outline-indigo-400'
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
                     className='w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600'
                  >
                     <option value=''>~Select Purpose~</option>
                     <option value='meeting'>Meeting</option>
                     <option value='interview'>Interview</option>
                     <option value='advertisements'>Advertisements</option>
                     <option value='personal'>Personal</option>
                     <option value='other'>Other</option>
                  </select>
               </div>
               <div>
                  <input 
                     type="datetime-local" 
                     onChange={(e) => setDate(e.target.value)}
                     value={date}
                     className='w-full border border-gray-300 text-gray-500 outline-indigo-600 p-2 mt-3 mb-5 rounded-lg'
                  />
               </div>

               <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-indigo-600 p-2 rounded-xl text-white transition-colors duration-200'
               >
                  {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto' /> : 'Schedule Visit'}
               </button>
            </form>
         </div>
      </>
   )
}

export default ScheduleVisit
