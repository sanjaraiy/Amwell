import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar></Navbar>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path="/doctors" element={<Doctors></Doctors>}></Route>
        <Route
          path="/doctors/:speciality"
          element={<Doctors></Doctors>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
        <Route
          path="/my-appointments"
          element={<MyAppointments></MyAppointments>}
        ></Route>
        <Route path="/appointment/:docId" element={<Appointment></Appointment>}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
};

export default App;
