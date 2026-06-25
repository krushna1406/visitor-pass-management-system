import React, {useState} from 'react'
import { signupUser } from '../services/api';
import { useAuthContext } from './useAuthContext';
import toast from 'react-hot-toast';

const useSignup = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [msg, setMsg] = useState('');
   const { dispatch } = useAuthContext()

   const signup = async (userData) => {
      setLoading(true)
      setError(null)

      try {
         const result = await signupUser(userData);
         if (result.success) {
            toast.success('User account created successfully !')
         }
      } catch (error) {
         toast.error(error.response?.data?.message || 'Internal server error !!')
         setError(error.response?.data?.message || 'Internal server error !!')
      } finally {
         setLoading(false)
      }
   }

   return {signup, loading, error};
}

export default useSignup