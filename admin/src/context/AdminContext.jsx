import axios from 'axios';
import {createContext, useState} from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
   
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
      try {
          const res = await axios.get(backendUrl + '/api/v1/admin/all-doctors', {
             headers: {adminToken: adminToken}
          })
          
          if(res.data.success){
              setDoctors(res.data.doctors);

          }else{
            toast.error(res.data.message);
          }

      } catch (error) {
         toast.error(error.message);
      }
    }

   const value = {
       adminToken,
       setAdminToken,
       backendUrl,
       doctors,
       getAllDoctors
   }

   return (
     <AdminContext.Provider value={value}>
        {props.children}
     </AdminContext.Provider>
   )
}

export default AdminContextProvider

