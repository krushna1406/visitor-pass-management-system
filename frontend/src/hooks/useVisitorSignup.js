import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { signupUser, verifyEmailOTP } from '../services/api';
import toast from 'react-hot-toast';

const useVisitorSignup = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const {dispatch} = useAuthContext()

   const verifyEmail = async (visitorData) => {
      setLoading(true);
      setError(null);
      try{
         const result = await verifyEmailOTP(visitorData);
         if(result.success) {
            toast.success('OTP sent to the email');
            return true;
         }
         return false;
      }catch(error) {
         const message = error.response?.data?.message || 'Internal server error';
         setError(message);
         return false;
      }finally {
         setLoading(false);
      }
   }

   const signup = async (email, otp) => {
      setLoading(true);
      setError(null)
      try{
         const result = await signupUser({email, otp});
         if(result.success) {

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
         const message = error.response?.data?.message || 'Internal Server Issue'
         setError(message);
      }finally{
         setLoading(false);
      }
   }
   return {verifyEmail, signup, loading, error};
}

export default useVisitorSignup