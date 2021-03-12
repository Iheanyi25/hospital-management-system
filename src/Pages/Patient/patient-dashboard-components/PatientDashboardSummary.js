import React from 'react'

export default function PatientDashboardSummary({pendingAppointmentsCount}) {
    return (
        <div className="row">
        <div className="col col-12 col-md-6 col-xl-4">
          <div className="card animated fadeInUp delay-01s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-5">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                </div>
                <div className="col col-7">
                  <h6 className="mt-0 mb-1">Appointments</h6>
                  <div className="count text-primary fs-20">
                    {pendingAppointmentsCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-6 col-xl-4">
          <div className="card animated fadeInUp delay-02s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-5">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                </div>
                <div className="col col-7">
                  <h6 className="mt-0 mb-1">Prescriptions</h6>
                  <div className="count text-primary fs-20">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-6 col-xl-4">
          <div className="card animated fadeInUp delay-03s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-5">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                </div>
                <div className="col col-7">
                  <h6 className="mt-0 mb-1">Notifications</h6>
                  <div className="count text-primary fs-20">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
