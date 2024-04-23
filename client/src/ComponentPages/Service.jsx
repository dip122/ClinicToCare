import React from 'react'
import './css/service.css'
import {useNavigate} from 'react-router-dom'

const Service = () => {

  const navigate = useNavigate();


  return (
    <div className = "service-class">
      <div className = "service-heading">A Clinic To Care Application</div>
      <div className = "service-desc">Imporve Your precription Management site wisely</div>

      <div className = "service-body">
        <div className = "service-input" onClick={()=>navigate('/pres-manage')}>
          <div className = "service-details">Prescription Management</div>
          <div className = "service-img"><img src="images/pres-manage.svg"/></div>
          <div className = "service-description">We manage your prescription in the most<br/> effective 
          manner so that you get a<br/> good experience while using the application.</div>
        </div>

        <div className = "service-input" onClick={()=>navigate('/clinic-manage')}>
          <div className = "service-details">Clinic Management</div>
          <div className = "service-img"><img src="images/clinic.svg"/></div>
          <div className = "service-description">User can store the details of the clinics <br/> they 
          visit so that when needed it comes handy.</div>
        </div>


        <div className = "service-input" onClick={()=>navigate('/medicine-manage')}>
          <div className = "service-details">Medicine Management</div>
          <div className = "service-img"><img src="images/medicine.svg"/></div>
          <div className = "service-description">User will be able to store the medicine<br/> details so that
           they don't have to remember anymore.</div>
        </div>


          
      </div>
    </div>
  )
}

export default Service