import React from 'react'
import './css/about.css'

const Service = () => {
  return (
    <div className = "serviceclass">
      <div className = "service-heading">Services provided</div>
      <div className = "service-body">
        <div className = "service-box">
          <div className = "service-icon"><img src="/images/register.png"/></div>
          <div className = "step-no">Step1</div>
          <div className = "step-name">Create Your account on ClinicToCare</div>
          <div className = "step-desc">Access All the feature present inside it</div>
        </div>

        <div className = "service-box">
          <div className = "service-icon"><img src="/images/hero.png"/></div>
          <div className = "step-no">Step2</div>
          <div className = "step-name">Add prescription of doctor</div>
          <div className = "step-desc">There is no need to remember the place where you kept your prescription</div>
        </div>

        <div className = "service-box">
          <div className = "service-icon"><img src="/images/aboutdoctor.webp"/></div>
          <div className = "step-no">Step3</div>
          <div className = "step-name">Add Clinic details of Doctor </div>
          <div className = "step-desc">You can add multiple clinic where your favourite doctor is having chamber</div>
        </div>

      </div>
    </div>
  )
}

export default Service