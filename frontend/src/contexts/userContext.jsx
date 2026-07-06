import { createContext, useReducer } from "react";

export const userContext = createContext();

const userReducer = (state, action) => {
   switch(action.type) {
      case 'GET_USERS':
         return {users: action.payload}
      case 'DELETE_USER':
         return{users: state.users.filter(user =>
            user._id !== action.payload
         )}
      default: return state
   }
}

export const UserContextProvider = ({children}) => {

   const [state, dispatch] = useReducer(userReducer, {users: []})

   return (
      <userContext.Provider value={{...state, dispatch}}>
         {children}
      </userContext.Provider>
   )
}