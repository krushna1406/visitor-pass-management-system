import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { signupUser } from '../services/api';
import toast from 'react-hot-toast';

const useVisitorSignup = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const {dispatch} = useAuthContext()

   const signup = async (visitorData) => {
      setLoading(true);
      setError(null)
      try{
         const result = await signupUser(visitorData);
         console.log(result)
         if(result.success) {
            toast.success('Signup Successful !')

            localStorage.setItem('user', JSON.stringify({
               id: result._id,
               email: result.email,
               role: result.role,
               token: result.token
            }))

            dispatch({
               type: 'LOGIN',
               payload: result
            })
         }
      }catch(error) {
         toast.error(error.response?.data?.message || 'Internal Server Issue');
      }finally{
         setLoading(false);
      }
   }
   return {signup, loading, error};
}

export default useVisitorSignup