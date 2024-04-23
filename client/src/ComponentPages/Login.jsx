import React, { useState } from 'react'
import './css/login.css'
import axios from 'axios';
import { useAuth } from '../Context/authcontext';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [auth,setAuth] = useAuth();//custom hook
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
    else if(password.length === 0){
      toast.error("Please enter correct password",toastoptions);
      return false;
    }
    return true;
  }

  //handlesubmit function
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const loginuser = {
      email,
      password,
    }
   // console.log(loginuser);
    if(MakeValidation()){
      console.log(loginuser);
      try{
        const res = await axios.post('http://localhost:5000/api/v1/auth/login',{
          email,
          password,
        });
        if(res && res.data.success) {
          console.log("user successfully logged in");
          toast.success("User loging successful",toastoptions);
          setAuth({
            ...auth,
            user : res.data.user,
            token : res.data.token,
          });
          await localStorage.setItem('auth',JSON.stringify(res.data));
          setTimeout(()=>{
            if(res.data.user.role === 1){
              console.log('adm');
              navigate('/admin-users')
            }
            else navigate('/dashboard');
          },2000)
        }else{
          console.log(res.data.message);
          console.log("Something went wrong");
          toast.error("something went wrong",toastoptions);
        }
      }catch(error){
      //  toast.error("error has occurred");
        console.log(error);
        toast.error('Something went wrong',toastoptions);
      }
    }

  }

  return (
    <div className = "loginclass">
        <div className = "login-heading">Login</div>
        <div className = "login-desc">To Enter into our site please log in</div>

        <div className = "login-body">
            <div className ="login-img"><img src="/images/login.png"/></div>
            <div className = "login-form">
                <form id = "login-form" onSubmit={handlesubmit}>
                    <input type = "text" placeholder = "Enter Your email" name = "email" required
                     value = {email}
                     onChange = {(e)=>setEmail(e.target.value)}/>
                    <input type = "password" placeholder = "enter Your password" name = "password" required
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}/>
                    <button type = "submit">Submit</button>
                    <a href="/sendresetpasswordemail">Forgot Password</a>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login