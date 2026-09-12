import React from 'react'

export default function LabDashboardHeader({firstName, lastName}) {
    return (
        <div className="row">
        <div className="col-12 col-md-6">
          <div className="card bg-light">
            <div className="card-header">
              Welcome {`${firstName} ${lastName}`}
            </div>
            <div className="card-body">
              You have no new notifications
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card text-white bg-primary">
            <div className="card-header">Important Updates</div>
            <div className="card-body">
              An apple a day keeps the doctor away
            </div>
          </div>
        </div>
      </div>
    )
}
