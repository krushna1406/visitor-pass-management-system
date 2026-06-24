import { useState } from "react";
import { loginUser } from "../services/api";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext()

   const login = async (email, password) => {
      setLoading(true)
      setError(null)

      try {
         const result = await loginUser({email, password});
         if(result.success) {
            localStorage.setItem('user', JSON.stringify(result));

            dispatch({type: 'LOGIN', payload: result})
         }
         
      } catch (error) {
         setError(error.response?.data?.message || 'Internal server error !!');
      }finally{
         setLoading(false)
      }
   }
   return {login, loading, error};
}