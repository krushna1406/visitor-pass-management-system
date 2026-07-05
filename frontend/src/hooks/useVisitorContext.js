import { useContext } from "react";
import {visitorContext} from '../contexts/visitorContext'

export function useVisitorContext() {
   const context = useContext(visitorContext);

   if(!context) {
      console.log('Use visitor context inside visitor context provider block');
   }

   return context;
}