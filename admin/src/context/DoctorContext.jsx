import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') ? localStorage.getItem('doctorToken') : '');
  const [appointments, setAppointments]  = useState([]);

  const getAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl  + '/api/v1/doctor/doctor-appointments', {
        headers: {doctorToken}
      })

      if(data.success){
         setAppointments(data.appointments.reverse());
         console.log(data.appointments.reverse());

      }else{
         toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const completeAppointment = async (appointmentId) => {
      try {

        const {data} = await axios.post(backendUrl + '/api/v1/doctor/complete-appointment', {appointmentId}, {
          headers: {
            doctorToken
          }
        })

        if(data.success){
          toast.success(data.success);
          getAppointments();
        }else{
          toast.error(data.message);
        }
        
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
  }

  const cancelAppointment = async (appointmentId) => {
      try {

        const {data} = await axios.post(backendUrl + '/api/v1/doctor/cancel-appointment', {appointmentId}, {
          headers: {
            doctorToken
          }
        })

        if(data.success){
          toast.success(data.success);
          getAppointments();
        }else{
          toast.error(data.message);
        }
        
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
  }

   const  value = {
      doctorToken,
      setDoctorToken,
      backendUrl,
      appointments,
      setAppointments,
      getAppointments,
      completeAppointment,
      cancelAppointment,
   }

   return (
    <DoctorContext.Provider value={value}> 
      {props.children}
    </DoctorContext.Provider>
   )
}

export default DoctorContextProvider;
  