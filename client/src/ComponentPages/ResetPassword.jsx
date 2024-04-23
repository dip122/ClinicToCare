import React, { useState } from 'react'
import './css/login.css'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const {token} = useParams();

  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 5000,
    pauseOnHover : true,
    draggable : true,
    style : {
      fontWeight : 'bold'
    }
  }

  const MakeValidation = ()=>{
    if(password.length === 0 || confirmPassword.length === 0){
      toast.error("Please enter correct password",toastoptions);
      return false;
    }
    else if(password!==confirmPassword){
        toast.error("password and confirmpassword is not matching",toastoptions);
        return false;
    }
    return true;
  }

  //handlesubmit function
  const handlesubmit = async(e)=>{
    e.preventDefault();
    if(MakeValidation()){
      try{
        const res = await axios.post(`http://localhost:5000/api/v1/auth/resetpassword/${token}`,{
          password,
        });
        if(res && res.data.success) {
          toast.success("User Password is Reset successfully",toastoptions);
          setTimeout(()=>{
            navigate('/login');
          },2000)
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
        <div className = "login-heading">Reset Password</div>

        <div className = "login-body">
            <div className = "login-form">
                <form id = "login-form" onSubmit={handlesubmit}>
                    <input type = "password" placeholder = "enter Your password" name = "password" required
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}/>
                    <input type = "password" placeholder = "enter Your confirm password" name = "confirmpassword" required
                    value = {confirmPassword}
                    onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ResetPassword;