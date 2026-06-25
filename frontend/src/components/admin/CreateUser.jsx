import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import useSignup from '../../hooks/useSignup'
import {ImSpinner8} from 'react-icons/im'

const CreateUser = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const { dispatch } = useAuthContext()
  const { signup, loading, error, msg} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, role };

    await signup(userData);
    if (!error) {
      setName('');
      setEmail('')
      setPassword('')
      setRole('')
    }
  }

  return (
    <>
      <div className='flex justify-center items-center min-h-[80vh] px-4">'>
        <form 
          onSubmit={handleSubmit}
          className='w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-5'
        >
          <h2 className='text-purple-500 font-semibold text-2xl text-center'>Create User</h2>


          <label className='block mb-1 text-md font-medium text-gray-600'>
            Name <sup className='text-red-500'>*</sup>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            className='w-full border rounded border-gray-400 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-purple-400'
          /><br />


          <label className='block mb-1 text-md font-medium text-gray-600'>
            Email<sup className='text-red-500'>*</sup>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            className='w-full border rounded border-gray-400 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-purple-400'
          /><br />
          
          
          <label className='block mb-1 text-md font-medium text-gray-600'>
            Password<sup className='text-red-500'>*</sup>
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            className='w-full border rounded border-gray-400 text-gray-700 px-3 py-1 focus:outline-2 focus:outline-purple-400'
          /><br />
          
          
          <label className='block mb-1 text-md font-medium text-gray-600'>
            Role<sup className='text-red-500'>*</sup>
          </label>
          <select
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required={true}
            className='w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-700'
          >
            <option className='text-gray-500'>~Select Role~</option>
            <option value="employee" className='text-gray-700'>Employee</option>
            <option value="security" className='text-gray-700 focus:bg-purple-400'>Security</option>
          </select>
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-purple-400 p-2 rounded-md text-white'
          >
            {loading ? <ImSpinner8 size={22} className='animate-spin mx-auto'/> :'Create User'}
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateUser