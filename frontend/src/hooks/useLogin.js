import { useState } from "react";
import { loginUser } from "../services/api";
import API from "../services/api";
import { useAuthContext } from "./useAuthContext";

export const useLogin = async () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext()

   const login = async (email, password) => {
      setLoading(true)
      setError(null)

      try {
         const result = await API.loginUser(email, password);
         if(result.success) {
            localStorage.setItem('user', JSON.stringify(result));

            dispatch({type: 'LOGIN', payload: result})
         }
         setLoading(false);
      } catch (error) {
         setError(error.response?.data?.message || 'INternal server error !!');
      }
   }
   return {login, loading, error};
}