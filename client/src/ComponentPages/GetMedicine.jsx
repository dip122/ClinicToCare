import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/authcontext';
import axios from 'axios';
import './css/GetMedicine.css';
import {useNavigate} from 'react-router-dom';

const GetMedicine = () => {

    const navigate = useNavigate();
    const [medicine,setMedicine] = useState([]);
    const [auth,setAuth] = useAuth();
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/v1/medicine/getmed');
                if(res && res.data.success) {
                    console.log(res.data.message);
                    console.log("Successfully we have got all the medicine details");
                    setMedicine(res.data.result)
                }else{
                    setMedicine([]);
                    console.log(res.data.message);
                }
            }catch(error){
                console.log(error);
                setMedicine([]);
            }
        };

        if(auth?.user){
            fetchData();
        }
    },[]);

    const DeleteMedicine = async(id)=>{
        try{
            const res = await axios.delete(`http://localhost:5000/api/v1/medicine/deletemed/${id}`);
            if(res && res.data.success){
                console.log(res.data.message);
                const UpdateMedicine = medicine.filter((medi)=>medi._id!==id);
                setMedicine(UpdateMedicine);
            }else{
                console.log(res.data.message);
                setMedicine([]);
            }
        }catch(error){
            console.log(error);
            setMedicine([]);
        }
    }


  return (
    <div className="Get-medicine-class">
        <div className = "MedicineTable">
            <div className="tableContainer">
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {medicine.map((med) => (
                    <tr key={med._id}>
                        <td>{med.name}</td>
                        <td>{med.type}</td>
                        <td>{med.time}</td>
                        <td>
                        <button onClick={() => DeleteMedicine(med._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <div className = "button-class"><button onClick={()=>navigate('/addmedicine')}>ADD Your Medicine</button></div>
            </div>
        </div>
    </div>
  )
}

export default GetMedicine