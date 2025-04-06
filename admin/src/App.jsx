import { useContext } from 'react';
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';

function App() {

  const {adminToken} = useContext(AdminContext);



  return adminToken ? (
    <div className='bg-[#F8F9FD]'>
       <ToastContainer></ToastContainer>
       <Navbar></Navbar>
    </div>
  ) : (
    <>
       <Login></Login>
       <ToastContainer></ToastContainer>
    </>
  )
}

export default App
