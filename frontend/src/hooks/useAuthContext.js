import { useContext } from "react";
import { authContext } from "../contexts/authContext";

export function useAuthContext() {
   const context = useContext(authContext);

   if(!context) {
      throw Error('useAuthContext should be called inside AuthContextProvider')
   }
   return context;
}