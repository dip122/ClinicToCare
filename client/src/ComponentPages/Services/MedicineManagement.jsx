import React from 'react'
import '../css/Management.css'

const MedicineManagement = () => {
  return (
    <>
        <div className = "Management">
            <div className = "heading">Medicine Management</div>
            <div className = "heading-desc">You want to keep track of different Medicine you take ? </div>

            <div className = "management-body">
                <div className = "body-img"><img src="images/medicine.svg"/></div>
                <div className = "Manage-descriptions">Here You can managage All Your Medicines you use to take. You have to create an account
                and then you have to login into Your MedCare website and you can everything what you can do</div>
            </div>
        </div>
    </>
  )
}

export default MedicineManagement