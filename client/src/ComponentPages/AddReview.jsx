import React, { useState } from 'react';
import './css/Review.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Review = () => {

    const navigate = useNavigate();
    const [review,setreview] = useState({
        name : '',
        content : '',
        ratings : 0,
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

    const handleinput = (e)=>{
        const {name,value} = e.target;
        setreview({
            ...review,
            [name] : value,
        })
    }

    const MakeValidation = ()=>{
        if(review.ratings === 0){
            toast.error("Please put us some rating",toastoptions);
            return false;
        }
        if(review.ratings>5){
            toast.error("Review should be below 5",toastoptions);
            return false;
        }
        return true;
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(MakeValidation()){
            try{
                const res = await axios.post('http://localhost:5000/api/v1/review/addreview',{
                    name : review.name,
                    content : review.content,
                    ratings : review.ratings,
                });
    
                if(res && res.data.success) {
                    console.log("review is added successfully")
                    toast.success("Review added successfully",toastoptions);
                    setTimeout(()=>{
                        navigate('/dashboard');
                    },2000)
                    
                }else{
                    console.log(res.data.message);
                    toast.error("something went wrong",toastoptions);
                    setTimeout(()=>{
                        navigate('/dashboard');
                    },3000)
                }
            }catch(error){
                console.log(error);
                toast.error("Something went wrong",toastoptions);
                setTimeout(()=>{
                    navigate('/dashboard');
                },3000)
            }
        }
    }
    
  return (
    <div className = "reviewclass">
        <div className = "review-heading">
            <h1 className = "h1-class">Add Your Review</h1>
            <div className = "review-desc">please rate us ! How o you feel ? </div>
        </div>

        <div className = "review-form-body">
            <div className = "review-img"><img src = "/images/login.png"/></div>
            <div className = "review-form">
                <form id = "review-from" onSubmit = {handleSubmit}>
                    <input type = "text" name = "name" placeholder = "enter Your Name"
                    value = {review.name}
                    onChange = {handleinput}/>
                    <textarea row = "40" cols = "50" name = "content" placeholder = "enter Your Review"
                    value = {review.content}
                    onChange = {handleinput}/>
                    <input type = "Number" name = "ratings" placeholder = "Enter Your ratings(0-5)"
                    value = {review.ratings}
                    onChange={handleinput}/>
                    <button type = "submit" id="btn-class">Submit</button>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
};

export default Review;