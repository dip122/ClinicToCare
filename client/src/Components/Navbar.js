import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { useAuth } from '../Context/authcontext';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    const toastoptions = {
        postion : 'bottom-right',
        autoclose : 5000,
        pauseOnHover : true,
        draggable : true,
        style : {
          fontWeight : 'bold'
        }
      }

    const logoutfunction = async()=>{
        setAuth({
            ...auth,
            user : null,
            token : "",
        })
        const data = await JSON.parse(localStorage.getItem('auth'));
        console.log(data);
        if(data)await localStorage.removeItem('auth');
        toast.success("Successfully Logged out",toastoptions);
        setTimeout(()=>{
            navigate('/')
        },1500)
    }
  return (
    <header>
        <div className = "container">
            <div className = "logo-brand">
                <NavLink to = "/">ClinicToCare</NavLink>
            </div>
            <div id ="mobile-menu-button">
                <button onClick={()=>setOpen(!open)}>Menu</button>
            </div>

            <nav id='navbar'>
                <ul>
                    {!auth?.user ? (
                        <>
                            <li>
                                <NavLink to = "/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/about">About</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/contact">contact</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/service">service</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/register">Register</NavLink>
                            </li>
                        </>

                    ) : (auth?.user?.role === 0 ? (
                        <>
                            <li>
                            <NavLink to = "/dashboard" >Home</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/getmedicine">MedList</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/adddoc">AddDoc</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/getdoc">DocList</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/review">AddReview</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/addclinic">AddClinic</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/getclinic">ClinicList</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/getreview">YourReviews</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/login" onClick = {logoutfunction}>Logout</NavLink>
                            </li>
                        </>
                     ) : (<>
                                                    <>
                            <li>
                            <NavLink to = "/admin-users-contact">Contacted</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/admin-users">Users</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/getreview">ReviewsManage</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/login" onClick = {logoutfunction}>Logout</NavLink>
                            </li>
                        </>
                     </>))}
                </ul>
            </nav>
            <nav id="mobile-menu">
            {open && (
                     <ul id='mobile-menu-items' onClick={()=>setOpen(!open)}>
                     {!auth?.user ? (
                         <>
                             <li>
                                 <NavLink to = "/">Home</NavLink>
                             </li>
                             <li>
                                 <NavLink to = "/about">About</NavLink>
                             </li>
                             <li>
                                 <NavLink to = "/contact">contact</NavLink>
                             </li>
                             <li>
                                 <NavLink to = "/service">service</NavLink>
                             </li>
                             <li>
                                 <NavLink to = "/login">Login</NavLink>
                             </li>
                             <li>
                                 <NavLink to = "/register">Register</NavLink>
                             </li>
                         </>
 
                     ) : (auth?.user?.role === 0 ? (
                        <>
                            <li>
                            <NavLink to = "/dashboard">Home</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/getmedicine">MedList</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/adddoc">AddDoc</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/getdoc">DocList</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/review">AddReview</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/addclinic">AddClinic</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/getclinic">ClinicList</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/getreview">YourReviews</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/login" onClick = {logoutfunction}>Logout</NavLink>
                            </li>
                        </>
                     ) : (<>
                                                    <>
                            <li>
                            <NavLink to = "/admin-users-contact">Contacted</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/admin-users">Users</NavLink>
                            </li>
                            <li>
                            <NavLink to = "/getreview">ReviewsManage</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/login" onClick = {logoutfunction}>Logout</NavLink>
                            </li>
                        </>
                     </>))}
                 </ul>       
                )}
            </nav>
        </div>
        <ToastContainer/>
    </header>
  )
}

export default Navbar;