import React, { useEffect, useState } from 'react'
import './css/addmedicine.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const AddMedicine = () => {
    const navigate = useNavigate();
    const [Medicine,setMedicine] = useState({
        name : '',
        type : '',
        time : '',
    });
    const toastoptions = {
        postion : 'bottom-right',
        autoclose : 8000,
        pauseOnHover : true,
        draggable : true,
    }

    const MakeValidation = ()=>{
        if(Medicine.name === "" || Medicine.type === "" || Medicine.time ===""){
            toast.error("Please enter all the fields",toastoptions);
            return false;
        }
        return true;
    }

    const handleinput = (e)=>{
        const {name,value} = e.target;
        setMedicine({
            ...Medicine,
            [name] : value,
        });
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(MakeValidation()){
            try{
                const res = await axios.post('http://localhost:5000/api/v1/medicine/addmed',{
                    name : Medicine.name,
                    type : Medicine.type,
                    time : Medicine.time,
                });
                if(res && res.data.success){
                    console.log("Medicine Updated Successfully");
                    toast.success(res.data.message,toastoptions);
                    navigate('/getmedicine');
                }else{
                    console.log(res.data.message);
                    toast.error("something went wrong",toastoptions);
                    navigate('/dashboard');
                }
            }catch(error){
                console.log(error);
                toast.error("Server side error in addmedicine",toastoptions);
            }
        }
    }

  return (
<div className = "div-medicine">
    <div className = "medicineclass">
        <div className = "heading">
            <div className = "heading-name">AddMedicine</div>
            <div className = "medicine-desc">Make Your medicine List</div>
        </div>

        <div className = "medicine-form">
            <div className = "imgclass"><img src = "images/login.png"/></div>
            <div className = "form-class">
                <form onSubmit={handleSubmit}>
                    <input type = "text" placeholder ="Enter Your name" name = "name"
                    value = {Medicine.name}
                    onChange={handleinput}/>
                    <input type = "text" placeholder ="Enter type of medicine" name ="type"
                    value = {Medicine.type}
                    onChange= {handleinput}/>
                    <input type ="text" placeholder="Enter time of medicine" name = "time"
                    value = {Medicine.time}
                    onChange={handleinput}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer/>
</div>
  )
}

export default AddMedicine;