import React from 'react'
import './css/home.css'
import {useNavigate} from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  
  return (
    <div className = "homeclass">
      <div className = "home-heading">Home</div>
      <div className = "home-desc">Welcome to Your ClinicToCare Site</div>

      <div className = "home-body">
        <div className = "home-img"><img src = "/images/home.svg"/></div>
        <div className = "home-form">
          <div className = "home-p">CliniCare brings you facilites so that you can store your medical documents effectively. And you don't have to search here and there when needed. 
          Documents and Clinics' details are stored so simply such that anyone can use it.</div>

          <button onClick={()=>navigate('/register')}>Register Here!</button>
        </div>
      </div>
    </div>
  )
}

export default Home