import React, { useEffect, useState } from 'react';
import './css/clinicadd.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/authcontext';

const Adddoc = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [currdate,setcurrdate] = useState(new Date());
    const [visitdate,setvisitdate] = useState(new Date());
    const [description,setdescription] = useState("");
    const [file,setfile] = useState(null);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        if(!auth){
            console.log('Not authenticated');
        }else{
            console.log(auth?.user)
        }
    },[])

    const toastoptions = {
        postion : 'bottom-right',
        autoclose : 8000,
        pauseOnHover : true,
        draggable : true,
        style : {
          fontWeight : 'bold'
        }
      }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('date', currdate);
            formData.append('visitdate', visitdate);
            formData.append('description', description);
            formData.append('file', file); // append the file object directly

           // console.log(formData);
            
            const response = await axios.post('http://localhost:5000/api/v1/clinic/adddoc', formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data);
            console.log("document can be added successfully" , response.data.success);
            if (response && response.data.success) {
                
                toast.success('File is uploaded successfully',toastoptions);
                console.log(response.data.message);
                setTimeout(()=>{
                    navigate('/dashboard');
                },2000)
            } else {
                toast.error(response.data.message,toastoptions);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error has occurred in server',toastoptions);
            navigate('/dashboard')
        }
    };

    return (
        <div className="clinicclass">
            <div className="addclinic">
                <h1 className="heading">
                    Add<span>Doc</span>
                </h1>

                <form id="clinic-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="clinic-desc">Enter clinic Details</div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Doctor's Name"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <div id = "label-class">Currentdate</div>
                    <input
                        type="date"
                        name="date"
                        placeholder="Enter currnet Date"
                        value={currdate}
                        onChange={(e)=>{setcurrdate(e.target.value)}}
                    />
                    <input
                        type="date"
                        name="visitdate"
                        placeholder="Enter visitdate"
                        value={visitdate}
                        onChange={(e)=>{setvisitdate(e.target.value)}}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e)=>setdescription(e.target.value)}
                    />
                    <div>
                        <div id = "label-class">Choose Precription</div>
                            <input
                                type="file"
                                name="file"
                                onChange={(e)=>{setfile(e.target.files[0])}}
                            />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>

            <ToastContainer/>
        </div>
    );
};

export default Adddoc;
