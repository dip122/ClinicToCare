import React from 'react'
import '../css/Management.css'

const ClinicManagement = () => {
  return (
    <>
        <div className = "Management">
            <div className = "heading">Clinic Management</div>
            <div className = "heading-desc">You want to keep track of different Doctor's Clinic ? </div>

            <div className = "management-body">
                <div className = "body-img"><img src="images/clinic.svg"/></div>
                <div className = "Manage-descriptions">Here You can managage Clinics where Doctor use to sit. You have to create an account
                and then you have to login into Your MedCare website and you can everything what you can do</div>
            </div>
        </div>
    </>
  )
}

export default ClinicManagement