import React from 'react'

export default function PharmacyDashboardHeader() {
    return (
        
        <div className="row">
        <div className="col-12 col-md-6">
          <div className="card bg-light">
            <div className="card-header">Welcome Pharm. Michael</div>
            <div className="card-body">
              You have 3 patients awaiting drug Prescription.
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card text-white bg-dark">
            <div className="card-header">Important Notes</div>
            <div className="card-body">
              CMD is to meet with all pharmacist heads of department
              for drug disbursement.
            </div>
          </div>
        </div>
      </div>
    )
}
