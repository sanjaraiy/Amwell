import { useContext } from 'react';
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

function App() {

  const {adminToken} = useContext(AdminContext);



  return adminToken ? (
    <div className='bg-[#F8F9FD]'>
       <ToastContainer></ToastContainer>
       <Navbar></Navbar>
       <div className='flex items-start'>
         <Sidebar></Sidebar>
         <Routes>
           <Route path='/' element={<></>}></Route>
           <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
           <Route path='/all-appointments' element={<AllAppointments></AllAppointments>}></Route>
           <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}></Route>
           <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}></Route>
         </Routes>
       </div>
    </div>
  ) : (
    <>
       <Login></Login>
       <ToastContainer></ToastContainer>
    </>
  )
}

export default App
