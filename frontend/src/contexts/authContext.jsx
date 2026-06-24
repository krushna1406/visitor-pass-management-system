import { createContext, useEffect, useReducer, useState } from "react";

export const authContext = createContext();

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         return { user: action.payload }
      case 'LOGOUT':
         return { user: null }
      default:
         return state
   }
}

export const AuthContextProvider = ({children }) => {

   const [state, dispatch] = useReducer(authReducer, { user: null });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
         dispatch({ type: 'LOGIN', payload: user });
      }
      setLoading(false)
   }, [])

   return (
      <authContext.Provider value={{...state, dispatch, loading}}>
         {children}
      </authContext.Provider>
   )
}