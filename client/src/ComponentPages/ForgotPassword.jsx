import React, { useState } from 'react'
import './css/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email,setEmail] = useState("");
  const navigate = useNavigate()

  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 5000,
    pauseOnHover : true,
    draggable : true,
    style : {
      fontWeight : 'bold'
    }
  }

  const validateEmail = (value) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };


  const MakeValidation = ()=>{
    if(email === "" || !validateEmail(email)){
      toast.error("Please enter correct email",toastoptions);
      return false;
    }
    return true;
  }

  //handlesubmit function
  const handlesubmit = async(e)=>{
    e.preventDefault();
    if(MakeValidation()){
      try{
        const res = await axios.post('http://localhost:5000/api/v1/auth/sendresetpasswordemail',{
          email,
        });
        if(res && res.data.success) {
          toast.success("Reset Password Email Sent Successfully",toastoptions);
          setTimeout(()=>{
            navigate('/login');
          },3000);
        }else{
          toast.error("something went wrong",toastoptions);
        }
      }catch(error){
        toast.error('Something went wrong',toastoptions);
      }
    }

  }

  return (
    <div className = "loginclass">
        <div className = "login-heading">Forgot Password</div>

        <div className = "login-body">
            <div className = "login-form">
                <form id = "login-form" onSubmit={handlesubmit}>
                    <input type = "text" placeholder = "Enter Your email" name = "email" required
                     value = {email}
                     onChange = {(e)=>setEmail(e.target.value)}/>
                     <button type = "submit">Submit</button>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ForgotPassword;