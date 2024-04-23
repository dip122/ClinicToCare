import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './ComponentPages/Home';
import About from './ComponentPages/About';
import Contact from './ComponentPages/Contact'
import Service from './ComponentPages/Service';
import Login from './ComponentPages/Login';
import Register from './ComponentPages/Register';
import Navbar from './Components/Navbar';
import Clinicadd from './ComponentPages/Clinicadd';
import PrivateRoute from './Components/Routes/PrivateRoutes';
import Adddoc from './ComponentPages/Adddoc';
import Dashboard from './ComponentPages/Dashboard';
import Review from './ComponentPages/AddReview';
import GetReview from './ComponentPages/GetReview';
import GetClinic from './ComponentPages/GetClinic';
import AddMedicine from './ComponentPages/AddMedicine';
import GetMedicine from './ComponentPages/GetMedicine';
import GetDoc from './ComponentPages/GetDoc';
import PresManagement from './ComponentPages/Services/PresManagement';
import ClinicManagement from './ComponentPages/Services/ClinicManagement';
import MedicineManagement from './ComponentPages/Services/MedicineManagement';
import Users from './ComponentPages/Admin-panel/Users';
import Contactadmin from './ComponentPages/Admin-panel/Contactadmin';
import AdminRoute from './Components/Routes/AdminRoute';
import ForgotPassword from './ComponentPages/ForgotPassword';
import ResetPassword from './ComponentPages/ResetPassword';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path = "/contact" element = {<Contact/>}/>
        <Route path = "/service" element = {<Service/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/sendresetpasswordemail" element = {<ForgotPassword/>}/>
        <Route path = "/resetpassword/:token" element = {<ResetPassword/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/pres-manage" element = {<PresManagement/>}/>
        <Route path = "/clinic-manage" element = {<ClinicManagement/>}/>
        <Route path = "/medicine-manage" element = {<MedicineManagement/>}/>
        <Route path = "/addclinic" element = {<PrivateRoute/>}>
            <Route path = "" element = {<Clinicadd/>}/>
        </Route>
        <Route path = "/getreview" element = {<PrivateRoute/>}>
            <Route path = "" element = {<GetReview/>}/>
        </Route>
        <Route path = "/adddoc" element = {<PrivateRoute/>}>
            <Route path = "" element = {<Adddoc/>}/>
        </Route>
        <Route path = "/dashboard" element = {<PrivateRoute/>}>
            <Route path = "" element = {<Dashboard/>}/>
        </Route>
        <Route path = "/review" element = {<PrivateRoute/>}>
            <Route path = "" element = {<Review/>}/>
        </Route>
        <Route path = "/getclinic" element = {<PrivateRoute/>}>
            <Route path = "" element = {<GetClinic/>}/>
        </Route>
        <Route path = "/addmedicine" element = {<PrivateRoute/>}>
            <Route path = "" element = {<AddMedicine/>}/>
        </Route>
        <Route path = "/getmedicine" element = {<PrivateRoute/>}>
            <Route path = "" element = {<GetMedicine/>}/>
        </Route>
        <Route path = "/getdoc" element = {<PrivateRoute/>}>
            <Route path = "" element = {<GetDoc/>}/>
        </Route>


        <Route path = "/admin-users" element = {<AdminRoute/>}>
          <Route path = "" element = {<Users/>}/>
        </Route>

        <Route path = "/admin-users-contact" element = {<AdminRoute/>}>
          <Route path = "" element = {<Contactadmin/>}/>
        </Route>

        <Route path = "/getreview" element = {<AdminRoute/>}>
          <Route path = "" element = {<GetReview/>}/>
        </Route>


      </Routes>
    </>
  );
}

export default App;
