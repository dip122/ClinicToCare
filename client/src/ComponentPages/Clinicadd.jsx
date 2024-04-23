import React, { useState } from 'react'
import './css/clinicadd.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Clinicadd = () => {
  const navigate = useNavigate();
  const [ClinicData,setClinicData] = useState({
    name : '',
    doctor_name : '',
    phoneno : '',
    address : '',
    days : [],
  });
  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 8000,
    pauseOnHover : true,
    draggable : true,
    style : {
      fontWeight : 'bold'
    }
  }
  
  const handlecheckbox = (day)=>{
    const updatedays = ClinicData.days.includes(day) ? ClinicData.days.filter((selectday)=>(selectday!==day)) : 
    [...ClinicData.days,day];

    setClinicData({
      ...ClinicData,
      days : updatedays,
    })
  };

  const handleinput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setClinicData({
      ...ClinicData,
      [name] : value,
    })
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      console.log(ClinicData);
      const response = await axios.post('http://localhost:5000/api/v1/clinic/addclinic',{
        name : ClinicData.name,
        doctor_name : ClinicData.doctor_name,
        phoneno : ClinicData.phoneno,
        address : ClinicData.address,
        days : ClinicData.days,
      });
      console.log(response);
      if(response && response.data.success){
        console.log(response.data.message);
        toast.success("Successfully Clinic is Added",toastoptions);
        setTimeout(()=>{
          navigate('/dashboard');
        },2000)
      }else{
        console.log("error has occured");
        toast.error("Something went wrong",toastoptions);
        setTimeout(()=>{
          navigate('/dashboard');
        },3000)
      }
    }catch(error){
      console.log("Error has occured");
      toast.error("Server side error in addclinic",toastoptions);
      console.log(error);
      setTimeout(()=>{
        navigate('/dashboard');
      },3000)
    }
  }
  const dayarray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


  return (
  <div className = "clinicclass">
    <div className = "addclinic">
      <h1 className = "heading">Add<span>Clinic</span></h1>

      <form id = "clinic-form" onSubmit = {handleSubmit}>
        <div className = "clinic-desc"> Enter clinic Details</div>
        <input type = "text" name = "name" placeholder = "Enter Your clinic Name" 
        value = {ClinicData.name}
        onChange = {handleinput}/>
        <input type = "text" name = "doctor_name" placeholder = "Enter Your Doctor Name"
        value = {ClinicData.doctor_name}
        onChange = {handleinput}/>
        <input type = "text" name = "phoneno" placeholder = "Enter Your phoneno"
        value = {ClinicData.phoneno}
        onChange = {handleinput}/>
        <input type = "text" name = "address" placeholder = "Enter Your address"
        value = {ClinicData.address}
        onChange = {handleinput}/>

        <div className = "closed">Closed ON</div>
        <div className = "days">
          {dayarray.map((day)=>(
              <div className = "days-info">
                  <input type = "checkbox" 
                  id = {day} 
                  name = "days" 
                  value = {day}
                  onChange={()=>handlecheckbox(day)}/>
                   <div className = "day">{day}</div>
               </div>
          ))}
        </div>
        <button type = "submit">Submit</button>
      </form>
    </div>
    <ToastContainer/>
   </div>
  );
};

export default Clinicadd;