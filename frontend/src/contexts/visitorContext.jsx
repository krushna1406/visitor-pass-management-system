import { createContext, useReducer } from "react";

export const visitorContext = createContext()

const visitReducer = (state, action) => {
   switch(action.type) {
      case 'SET_VISITORS':
         return {
            visitors: action.payload
         }
      case 'APPROVE_VISITOR':
         return {
            visitors: state.visitors.filter(
               visitor => visitor._id !== action.payload
            )
         }
      case 'REJECT_VISITOR':
         return {
            visitors: state.visitors.filter(
               visitor => visitor._id !== action.payload
            )
         }
      case 'DELETE_VISITOR':
         return {
            visitors: state.visitors.filter(
               visitor => visitor._id !== action.payload
            )
         }
      default: return state
   }
}

export const VisitorContextProvider = ({children}) => {

   const [state, dispatch] = useReducer(visitReducer, {visitors: []})

   return (
      <visitorContext.Provider value={{...state, dispatch}}>
         {children}
      </visitorContext.Provider>
   )
}