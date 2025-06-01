import { createContext } from "react";
import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
export const AppContext = createContext();
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";

const AppContextProvider = (props) => {

    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    
    const getDoctorsData = async () => {
      try {
          
        const {data} = await axios.get(backendUrl+'/api/v1/doctor/doctor-list');

        if(data.success){
            setDoctors(data.doctors);
        }else{
           toast.error(data.message);
        }

      } catch (error) {
         toast.error(error.message)
      }
    }


    
    const value = {
      doctors,
      currencySymbol

    }


    useEffect(() => {
        getDoctorsData();
    }, [])

   return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
   )

}

export default AppContextProvider;