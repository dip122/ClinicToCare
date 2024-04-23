import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/GetMedicine.css'

const Contactadmin = () => {

    const [contacts,setContacts] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get("http://localhost:5000/api/v1/admin/getcontactus");
                if(response && response.data.success){
                    setContacts(response.data.allcontact);
                }else{
                    console.log("we have not received any contact")
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[]);

    const DeleteContacthandler = async(id)=>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/v1/contact/deletecontact/${id}`);
            if(response && response.data.success){
                console.log("Deleted successfully");
                const newcontacts = contacts.filter((contact)=>contact._id!==id);
                setContacts(newcontacts);
            }else{
                console.log("contact not deleted");
            }
        }catch(error){
            console.log(error);

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
                            <th>Email</th>
                            <th>Phoneno</th>
                            <th>Question</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneno}</td>
                            <td>{user.content}</td>
                            <td>
                                <button onClick={()=>DeleteContacthandler(user._id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Contactadmin