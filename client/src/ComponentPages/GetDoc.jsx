import React, { useEffect, useState } from 'react'
import './css/GetDoc.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../Context/authcontext';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const GetDoc = () => {
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const [documents,setDocuments] = useState([]);
    const [File,setFile] = useState(null);

    const toastoptions = {
      postion : 'bottom-right',
      autoclose : 5000,
      pauseOnHover : true,
      draggable : true,
      style : {
        fontWeight : 'bold'
      }
    }


    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get('http://localhost:5000/api/v1/clinic/getdoc');
                if(response && response.data.success){
                    // console.log("Successfully we have got all the precriptions");
                    setDocuments(response.data.documents);
                }else{
                    console.log(response.data.message);
                    setDocuments([]);
                }
            }catch(error){
                console.log(error);
                setDocuments([]);
            }
        }

        if(auth?.user){
            fetchData();
        }
    },[]);

    const fetchFile = async (url) => {
      window.open(url, '_blank');
    };
      

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date ? new Date(date).toLocaleDateString('en-US', options) : '';
    };

    const DeleteFile = async(id)=>{
     // console.log(id);
      try{
        const response = await axios.delete(`http://localhost:5000/api/v1/clinic/deletedoc/${id}`);
        if(response && response.data.success){
          const updatedDocuments = documents.filter((doc)=>doc._id!==id);
          toast.success("Prescription deleted successfully",toastoptions);
          setDocuments(updatedDocuments);
        }else{
          toast.error("something went wrong",toastoptions);
        }
      }catch(error){
        console.log(error);
        toast.error("Server side error in case of delete",toastoptions);
      }

    }
  return (
    <div className = "Getdoc-class">
        <div className = "get-details">
            {documents.length>0 ? (documents.map((doc)=>(
                    <div className = "doc-class" key={doc._id}>
                        <div className = "doctor-name">Name : {doc.name}</div>
                        <div className = "currdate">Date : {formatDate(doc.date)}</div>
                        <div className = "visitdate">Visitdate : {formatDate(doc.visitdate)}</div>
                         <div className = "description">About : {doc.description}</div>
                         <div className = "document-upload">
                            <button onClick={() => fetchFile(doc.file.url)}>Fetch File</button>
                            <div id = "delete-btn"><button onClick={() =>DeleteFile(doc._id)}>Delete File</button></div>
                        </div>
                   </div>
            ))) : (<div id = "middle-class"> You Can See Your Saved Document Here </div>)}
        </div>
        <ToastContainer/>
    </div>
  )
}

export default GetDoc