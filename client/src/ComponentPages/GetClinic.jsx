import React, { useEffect, useState } from 'react'
import './css/getclinic.css';
import axios from 'axios';
import { useAuth } from '../Context/authcontext';

const GetClinic = () => {
    const [clinics,setClinics] = useState([]);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
       
        const fetchData = async()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/v1/clinic/allclinic');
                if(res && res.data.success){
                    console.log("Abhik");
                    setClinics(res.data.allclinic);
                    console.log(res.data);
                }else{
                    setClinics([]);
                }
            }catch(error){
                console.log(error);
                setClinics([]);
            }
        }

        if(auth?.user){
            console.log("ok");
            fetchData();
        }
    },[]);

    const DeleteClinic = async(id)=>{
        try{
            const res = await axios.delete(`http://localhost:5000/api/v1/clinic//deleteclinic/${id}`);
            if(res && res.data.success){
                console.log(res.data.message);
                const updateClinicList = clinics.filter((clinic)=>clinic._id!==id);
                setClinics(updateClinicList);
            }else{
                console.log(res.data.message);
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
      <div id = "getclinic-class">
        <div className="wholeclass">
          <div className="getclinicclass">
            {clinics.length>0 ? (clinics.map((clinic) => (
              <div className="singleclinic" key={clinic._id}>
                <div className="Name">
                  ClinicName : <span>{clinic.name}</span>
                </div>
                <div className="doctor_name">
                  Doctor Name : <span>{clinic.doctor_name}</span>
                </div>
                <div className="phoneno">
                  Phoneno : <span>{clinic.phoneno}</span>
                </div>
                <div className="address">
                  ClinicAddress : <span>{clinic.address}</span>
                </div>
                <div className="days">
                  ClosedDays : <span>{clinic.days.join(', ')}</span>
                </div>
                <div className = "buttonclass">
                    <button onClick={()=>DeleteClinic(clinic._id)}>Delete</button>
                </div>
              </div>
            ))) : (<div id = "middle-class"> You Can See Your Saved Clinics Here </div>)}
          </div>
        </div>
      </div>
)};

export default GetClinic;