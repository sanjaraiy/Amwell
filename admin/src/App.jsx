import { useContext } from 'react';
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';

function App() {

  const {adminToken} = useContext(AdminContext);



  return adminToken ? (
    <div>
       <ToastContainer></ToastContainer>
    </div>
  ) : (
    <>
       <Login></Login>
       <ToastContainer></ToastContainer>
    </>
  )
}

export default App
