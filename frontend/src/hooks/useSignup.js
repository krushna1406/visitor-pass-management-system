import React, {useState} from 'react'
import { signupUser } from '../services/api';
import { useAuthContext } from './useAuthContext';

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
            setMsg('User created successfully');
         }
      } catch (error) {
         setError(error.response?.data?.message || 'Internal server error !!');
      } finally {
         setLoading(false)
      }
   }

   return {signup, loading, error, msg};
}

export default useSignup