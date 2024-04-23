import React, { useState } from 'react'
import './css/register.css'
import  axios  from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [password,setPassword] = useState("");
    const [phoneno,setPhoneno] = useState("");
    const navigate = useNavigate();

    const toastoptions = {
        postion : 'bottom-right',
        autoclose : 8000,
        pauseOnHover : true,
        draggable : true,
    }

    const validateEmail = (value) => {
        // Regular expression for validating email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      };
    
    const MakeValidation = ()=>{
        if(name === ""){
            toast.error("Please specify Your name",toastoptions);
            return false;
        }
        if(email === "" || !validateEmail(email)){
            toast.error("Please enter valid email address",toastoptions);
            return false;
        }
        if(password === ""){
            toast.error("Please enter Your Password",toastoptions);
            return false;
        }
        if(phoneno === ""){
            toast.error("Please enter phoneno",toastoptions);
            return false;
        }
        if(password!==confirmpassword){
            toast.error("confirmpassword and normal password have to match",toastoptions);
            return false;
        }
        console.log("email has berceived ");
        return true;
    }


    const handlesubmit = async(e)=>{
        e.preventDefault();
        if(MakeValidation()){
            try{
                const res = await axios.post('http://localhost:5000/api/v1/auth/register',{
                    name,
                    email,
                    password,
                    phoneno,
                })
                console.log(res);
                if(res && res.data.success) {
                   // console.log("success!");
                    toast.success("successfully registered",toastoptions);
                    setTimeout(()=>{
                        navigate('/login');
                    },2000);
                }else{
                    console.log("Error in Axios We have encounterd");
                    toast.error(res.data.message,toastoptions);
                }
            }catch(error){
                //console.log(error);
                toast.error("Server Side error has been occured",toastoptions);
            }
        }
    }
    
    //react hooks we have to use
  return (
    <div className = "register">
        <div className = "register-heading">Register</div>
        <div className = "register-desc ">Create your account first to login in</div>


        <div className = "register-body">
            <div className = "register-img"><img src = "/images/register.png"/></div>
            <div className = "register-form">
                <form id = "register-form" onSubmit={handlesubmit}>
                    <input type = "text" placeholder = "Enter Your name" name = "name" required
                    value = {name}
                    onChange = {(e)=>{setName(e.target.value)}}/>
                    <input type = "text" placeholder = "Enter Your email" name = "email" required
                    value = {email}
                    onChange= {(e)=>{setEmail(e.target.value)}}/>
                    <input type = "password" placeholder = "Enter Your favsports" name = "confirmpassword" required
                    value = {confirmpassword}
                    onChange = {(e)=>{setConfirmPassword(e.target.value)}}/>
                    <input type = "password" placeholder = "Enter Your password" name = "password" required
                    value = {password}
                    onChange = {(e)=>{setPassword(e.target.value)}}/>
                    <input type = "text" placeholder = "Enter Your phoneno" name = "phoneno" required
                    value = {phoneno}
                    onChange = {(e)=>{setPhoneno(e.target.value)}}/>
                    
                    <button type = "submit">Submit</button>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Register