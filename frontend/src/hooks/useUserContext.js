import { useContext } from "react";
import { userContext } from "../contexts/userContext";

export function useUserContext() {
   const context = useContext(userContext);

   if(!context) {
      console.log('Use userContext in user context provider block')
   }
   return context;
}