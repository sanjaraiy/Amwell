import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/v1/doctor/doctor-appointments",
        {
          headers: { doctorToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/doctor/complete-appointment",
        { appointmentId },
        {
          headers: {
            doctorToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.success);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: {
            doctorToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.success);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
     try {
        const {data} = await axios.get(backendUrl + 'api/v1/doctor/dashboard', {
          headers: {doctorToken}
        })

        if(data.success){
          setDashData(data.dashData);
        }else{
          toast.error(data.message);
        }

     } catch (error) {
      console.log(error);
      toast.error(error.message);
     }
  }

  const getProfileData = async () => {
     try {
       const {data} = await axios.get(backendUrl + '/api/v1/doctor/profile', {
        headers: {doctorToken}
       })
       if(data.success){
        setProfileData(data.profileData);
        console.log(data.profileData);
       }
     } catch (error) {
      console.log(error);
      toast.error(error.message);

     }
  }
  const value = {
    doctorToken,
    setDoctorToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData, 
    setDashData, 
    getDashData,
    profileData,
    setProfileData,
    getProfileData

  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
