import React, { useEffect, useState } from 'react'
import Visitor from './Visitor'
import { getAllVisitor } from '../../services/api';
import { useVisitorContext } from '../../hooks/useVisitorContext';
import { IoInformationCircleOutline } from 'react-icons/io5'
import { exportCSV } from '../../services/api';
import toast from 'react-hot-toast';

const VisitorList = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { visitors, dispatch } = useVisitorContext()

  useEffect(() => {
    const getVisitors = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await getAllVisitor()
        if (result.success) {
          dispatch({
            type: 'SET_VISITORS',
            payload: result.visitors
          })
          setLoading(false)
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Internal server error')
        setLoading(false)
      }
    }
    getVisitors()
  }, [])

  const handleCSVExport = async () => {
    try{
      const data = await exportCSV();

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'visitors_data.csv';

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    }catch(error){
      toast.error('Failed to export csv file');
    }
  }

  {loading && <div className='text-center mt-10 text-gray-400 text-xl'>Loading....</div>}
  
  {error && 
    <div className='text-center mt-10 text-xl text-red-500'>
      {error}
    </div>
  }

  return (
    <>
      <div className='flex justify-between px-12 py-3'>
        <div className='h-8 border pt-1 px-5 mt-3 rounded-2xl'>Search Component here</div>
        <button
          onClick={handleCSVExport}
          className='px-3 py-2 mt-2 rounded-md bg-yellow-400 hover:bg-yellow-500 transition-[0.09] active:bg-yellow-600 active:scale-98'
        >
          Export CSV
        </button>
      </div>
      <div className='bg-[#f9f9f9] py-1 mx-8 shadow-sm rounded-md'>
        <div className='grid grid-cols-[0.3fr_1.1fr_1.5fr_0.8fr_0.4fr_1fr] gap-2 px-5 py-3 bg-blue-500  text-white rounded-t-md font-bold'>
          <p>Profile</p>
          <p>Name</p>
          <p>Email</p>
          <p className='text-start'>Phone</p>
          <p className='text-start'>Host</p>
          <p className='text-start ml-6'>Status</p>
        </div>

        <div className='max-h-[calc(100vh-220px)] overflow-y-auto'>
          {visitors.length === 0 ? (
            <div className='text-gray-400 text-center my-8'>
              <div className='flex justify-center'><IoInformationCircleOutline size={40}/></div>
              <p>No records found</p>
            </div>
          ) : (
            visitors.map((visitor, index) =>
              <Visitor
                key={visitor._id} visitor={visitor} index={index}
              />
            )
          )
          }
        </div>
      </div>
    </>
  )
}

export default VisitorList