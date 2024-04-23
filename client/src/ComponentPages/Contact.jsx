import React, { useState } from 'react'
import './css/contact.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const navigate = useNavigate();
  const [details,setDetails] = useState({
    name : '',
    email : '',
    phoneno : '',
    content : '',
  });

  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 8000,
    pauseOnHover : true,
    draggable : true,
  }


  const handleinput = (e)=>{
    const {name,value} = e.target
    setDetails({
      ...details,
      [name] : value,
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/v1/contact/addcontact',{
        name : details.name,
        email : details.email,
        phoneno : details.phoneno,
        content : details.content,
      });

      if(res && res.data.success) {
        //console.log(res.data.message);
        toast.success("Successfully contacted Admin",toastoptions);
        setTimeout(()=>{
          navigate('/');
        },2000)
      }else{
        console.log("Contact failed");
        navigate('/');
      }
    }catch(error){
      console.log(error);
      console.log("Handlesubmit is the best thing...But check the error first");
      navigate('/')
    }
  }


  return (
    <div className = "contact">
      <div className = "contact-heading">Contact Us</div>
      <div className = "contact-description">
        Feels free to contacting us.Submit your queries here! and our team always here to help you 
        as they are very passonate in these facts
      </div>


      <div className = "contact-body">
        <div className = "contact-img"><img src="/images/support.png"/></div>
        <div className = "contact-form">
          <form id = "contact-form" onSubmit = {handleSubmit}>
            <input type = "text" placeholder = "Enter Your name" name = "name" required
            value = {details.name}
            onChange = {handleinput}/>
            <input type = "text" placeholder = "Enter Your email" name ="email" required
            value = {details.email}
            onChange = {handleinput}/>
            <input type = "text" placeholder = "enter Your Phoneno" name = "phoneno" required
            value = {details.phone}
            onChange = {handleinput}/>
            <textarea cols = "30" row = "10" placeholder='Enter Your Question' name = "content" required
            value = {details.content}
            onChange={handleinput}/>
            <button type = "submit" id = "btn-class">Submit here</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Contact