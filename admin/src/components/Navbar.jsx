import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import {DoctorContext} from '../context/DoctorContext';
function Navbar() {
   
    const {adminToken, setAdminToken} = useContext(AdminContext);
    const {doctorToken, setDoctorToken} = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/')
        adminToken && setAdminToken('');
        adminToken && localStorage.removeItem('adminToken');
        doctorToken && setDoctorToken('');
        doctorToken && localStorage.removeItem('doctorToken');
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
             <div className="w-44 cursor-pointer flex gap-2 items-center" onClick={() => navigate("/")}>
        <svg
          width="42"
          height="32"
          viewBox="0 0 46 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 33L4.60606 25H12.2448C17.2569 25 21.4947 28.7103 22.1571 33.6784L23 40H13L11.5585 36.6365C10.613 34.4304 8.44379 33 6.04362 33H0Z"
            fill="#0047C1"
          ></path>
          <path
            d="M46 33L41.3939 25H33.7552C28.7431 25 24.5053 28.7103 23.8429 33.6784L23 40H33L34.4415 36.6365C35.387 34.4304 37.5562 33 39.9564 33H46Z"
            fill="#0047C1"
          ></path>
          <path
            d="M4.60606 25L18.9999 0H23L22.6032 9.52405C22.2608 17.7406 15.7455 24.3596 7.53537 24.8316L4.60606 25Z"
            fill="#0047C1"
          ></path>
          <path
            d="M41.3939 25L27.0001 0H23L23.3968 9.52405C23.7392 17.7406 30.2545 24.3596 38.4646 24.8316L41.3939 25Z"
            fill="#0047C1"
          ></path>
        </svg>
        <h1 className="text-xl md:text-3xl font-bold text-[#0a1baf]">Amwell</h1>
      </div>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar