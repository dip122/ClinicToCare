import React from 'react'
import '../css/Management.css';

const PresManagement = () => {
  return (
    <>
        <div className = "Management">
            <div className = "heading">Prescription Management</div>
            <div className = "heading-desc">You want to Manage all of Your previous prescription ? </div>

            <div className = "management-body">
                <div className = "body-img"><img src="images/pres-manage.svg"/></div>
                <div className = "Manage-descriptions">Here You can managage Your Prescriptions. You have to create an account
                and then you have to login into Your MedCare website and you can everything what you can do</div>
            </div>
        </div>
    </>
  )
}

export default PresManagement