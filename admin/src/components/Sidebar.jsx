import React, { useContext } from 'react';
import {AdminContext} from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';


function Sidebar() {
   
   const {adminToken} = useContext(AdminContext);
   const {doctorToken} = useContext(DoctorContext);



  return (
    <div className='min-h-screen bg-white border-r'>
      {
         adminToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/admin-dashboard'}>
             <img src={assets.home_icon} alt="home_icon" />
             <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/all-appointments'}>
             <img src={assets.appointment_icon} alt="appointment_icon" />
             <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/add-doctor'}>
             <img src={assets.add_icon} alt="add_icon" />
             <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/doctor-list'}>
             <img src={assets.people_icon} alt="people_icon" />
             <p className='hidden md:block'>Doctors List</p>
          </NavLink>
         </ul>
      }

       {
         doctorToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/doctor-dashboard'}>
             <img src={assets.home_icon} alt="home_icon" />
             <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/doctor-appointments'}>
             <img src={assets.appointment_icon} alt="appointment_icon" />
             <p className='hidden md:block'>Appointments</p>
          </NavLink>
         
          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : '' }`} to={'/doctor-profile'}>
             <img src={assets.people_icon} alt="people_icon" />
             <p className='hidden md:block'>Profile</p>
          </NavLink>
         </ul>
      }
    </div>
  )
}

export default Sidebar