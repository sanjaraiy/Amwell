import React, { useEffect } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

function DoctorAppointments() {
  
    const {doctorToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext);
    const {calculateAge, slotDateFormat, currency} = useContext(AppContext);


     useEffect(() => {
        if(doctorToken){
            getAppointments();
        }
     }, [])

  return (
    <div className='w-full max-w-6xl m-5'>
         <p className='mb-3 text-lg font-medium'>All Appointments</p>
         <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
            <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
            </div>

            {
                 appointments.map((item, idx) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gary-500 py-3 px-6 border-b :bg-gray-50' key={idx}>
                        <p className='max-sm:hidden'>{idx+1}</p>
                        <div className='flex item-center gap-2'>
                           <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                        </div>
                        <div>
                            <p className='text-xs inline border border-primary px-2 rounded-full'>
                                {item.payment ? 'Online' : 'CASH'}
                            </p>
                        </div>
                        <p className='max-sm:hidden'>
                          {calculateAge(item.userData.age)}  
                        </p>
                        <p>
                          {slotDateFormat(item.slatDate)}, {item.slotTime}
                        </p>
                        <p>{currency} {item.amount}</p>
                        <div className='flex'>
                            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                            <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                        </div>
                    </div>
                 ))
            }
         </div>
    </div>
  )
}

export default DoctorAppointments