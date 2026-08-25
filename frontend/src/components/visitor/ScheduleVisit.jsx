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
   const [photo, setPhoto] = useState(null);
   const [loading, setLoading] = useState(false);

   const { user } = useAuthContext();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if(!photo) {
         setLoading(false);
         return toast.error('Please choose the image');
      }

      const selected = new Date(date);
      const today = new Date();

      if(selected < today) {
         toast.error('Cannot schedule visit for past dates');
         setLoading(false);
         return;
      }
      try {
         const formData = new FormData();
         formData.append("name", name);
         formData.append('email', user.email);
         formData.append("phone", phone);
         formData.append("employee", employee);
         formData.append("purpose", purpose);
         formData.append("visitDate", date);
         formData.append('photo', photo);

         const result = await createVisitor(formData);
         if (result.success) {
            toast.success('Visitor scheduled successfully!');
            setName('');
            setPhone('');
            setEmployee('');
            setPurpose('');
            setDate('');
            setPhoto(null);
         }
      } catch (error) {
         toast.error(error.response?.data?.message || 'Failed to schedule visit');
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <div className='flex justify-center items-center min-h-[90vh] px-4'>
            <form
               onSubmit={handleSubmit}
               className='w-sm sm:w-lg bg-white rounded-2xl shadow-md p-8 space-y-2'
            >
               <h2 className='text-blue-600 font-semibold text-2xl text-center'>Schedule Visitor</h2>

               <div className='grid grid-cols-1 sm:grid-cols-[1.4fr_0.6fr] gap-1 sm:gap-10'>
                  <div>
                     <div>
                        <label className='block mb-1 text-sm font-medium text-gray-600'>
                           Name <sup className='text-red-500'>*</sup>
                        </label>
                        <input
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required={true}
                           className='w-full border rounded-md border-gray-300 text-gray-700 px-2 py-1 focus:outline-2 focus:outline-blue-400'
                        />
                     </div>

                     <div>
                        <label className='block mb-1 mt-2 text-sm font-medium text-gray-600'>
                           Phone <sup className='text-red-500'>*</sup>
                        </label>
                        <input
                           type="tel"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           required={true}
                           className='w-full border rounded-md border-gray-300 text-gray-700 px-2 py-1 focus:outline-2 focus:outline-blue-400'
                        />
                     </div>
                  </div>
                  <div>
                     <label className='block mb-1 text-sm font-medium text-gray-600'>
                        Choose Image
                     </label>

                     <div>
                        <div 
                           className='w-22 h-22 my-2 ml-2 rounded-md border-2 border-dashed border-blue-300 overflow-hidden bg-blue-50 flex items-center justify-center'
                        >
                           {photo ? (
                              <img
                                 src={URL.createObjectURL(photo)}
                                 alt="Profile-preview"
                                 className='w-full h-full object-cover'
                              />
                           ) : (
                              <label htmlFor='pfp' className='text-sm text-gray-400 text-center py-10 px-1'>
                                 No image
                              </label>
                           )}

                           <input
                              type="file"
                              id="pfp"
                              accept="image/*"
                              onChange={(e) => setPhoto(e.target.files[0])}
                              className='hidden'
                           />
                        </div>                        
                     </div>
                  </div>
               </div>

               <div>
                  <label className='block mb-1 text-sm font-medium text-gray-600'>
                     Employee ID <sup className='text-red-500'>*</sup>
                  </label>
                  <input
                     type="tel"
                     value={employee}
                     onChange={(e) => setEmployee(e.target.value)}
                     required={true}
                     className='w-full border rounded-md border-gray-300 text-gray-700 px-2 py-1 focus:outline-2 focus:outline-blue-400'
                  />
               </div>

               <div>
                  <label className='block mb-1 text-sm font-medium text-gray-600'>
                     Purpose <sup className='text-red-500'>*</sup>
                  </label>
                  <select
                     value={purpose}
                     onChange={(e) => setPurpose(e.target.value)}
                     required={true}
                     className='w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600'
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
                     className='w-full border border-gray-300 text-gray-500 outline-blue-600 p-2 mt-3 mb-5 rounded-lg'
                  />
               </div>

               <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-blue-600 p-2 rounded-xl text-white transition-colors duration-200'
               >
                  {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto' /> : 'Schedule Visit'}
               </button>
            </form>
         </div>
      </>
   )
}

export default ScheduleVisit
