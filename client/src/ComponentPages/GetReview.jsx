import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Context/authcontext';
import './css/getreview.css';

const GetReview = () => {

    const [reviews,setReviews] = useState([]);
    const [auth,setAuth]  = useAuth();//for authenticate user

    useEffect(()=>{
        const fetchDataperson = async()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/v1/review/getreviewbyperson');
                if(res && res.data.success){
                    console.log(res.data.message);
                    console.log("Successfully we have got the response");
                    setReviews(res.data.getreview);
                }else{
                    setReviews([]);
                }
            }catch(error){
                console.log(error);
                console.log("Please check the error");
                setReviews([]);
            }
        }

        const fetchAllreviews = async() =>{
            try{
                const response = await axios.get('http://localhost:5000/api/v1/review/getreview');
                if(response && response.data.success){
                    setReviews(response.data.getreview);
                }else{
                    console.log('review is not fetched');
                }
            }catch(error){
                console.log(error);
            }
        }

        if(auth?.user?.role === 0)fetchDataperson();
        if(auth?.user?.role === 1)fetchAllreviews();
    },[]);//whenever i will refresh the page this will work



    const Deletereview = async(id)=>{
        try{
            const res = await axios.delete(`http://localhost:5000/api/v1/review/deletereview/${id}`);
            if(res && res.data.success){
                console.log(res.data.message);
                const updateReviews = reviews.filter((review)=>review._id!==id);
                setReviews(updateReviews);
            }else{
                console.log(res.data.message);
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className = "Niceclass">
        <div className = "getreviewclass">
            {reviews.length >0 ? (reviews.map((review)=>(
                 <div key={review._id} className="singlereview">
                    <div className="butt-class">
                        <div className="name"><span>Name : </span>{review.name}</div>
                        <div className="content"><span>Content : </span>{review.content}</div>
                        <div className="ratings"><span>Ratings : </span>{review.ratings}</div>
                    </div>
                    <div className ="button">
                        <button onClick={()=>Deletereview(review._id)}>Delete</button>
                    </div>
                </div>
            ))) : (<div id = "middle-class"> You Can See Your own Commnet About CliniToCare Here </div>)}
        </div>
    </div>
  )
}

export default GetReview;