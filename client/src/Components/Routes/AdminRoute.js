import {useState,useEffect} from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/authcontext';
import {Outlet} from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = ()=>{
    const [auth,setAuth] = useAuth();
    const [ok,setOk] = useState(false);

    useEffect(()=>{
        
        const authCheck= async() =>{
            const res = await axios.get('http://localhost:5000/api/v1/auth/admin-auth');
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }

        
        if(auth?.token)authCheck();
    },[auth?.token]);


    return ok ? <Outlet/> : <Spinner/>;
};


export default AdminRoute;