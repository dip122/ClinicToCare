import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/GetMedicine.css'

const Users = () => {

    const [users,setuser] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetecUsers = async()=>{
            try{
                const response = await axios.get('http://localhost:5000/api/v1/admin/getusers');
                console.log(response);
                if(response && response.data.success){
                    setuser(response.data.users);
                }else{
                    console.log('we have not found any user');
                }
            }catch(error){
                console.log(error);
            }
        }
        fetecUsers();
    },[])
  return (
<div className="Get-medicine-class">
    <div className = "MedicineTable">
        <div className="tableContainer">
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phoneno</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneno}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default Users