import React from 'react'

export default function DoctorPatientSummary({patientCount}) {
    return (
        <div className="row">
            <div className="col col-12 col-md-6 col-xl-3">
                <div className="card animated fadeInUp delay-01s bg-light">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col col-5">
                                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users"></div>
                            </div>
                            <div className="col col-7">
                                <h6 className="mt-0 mb-1">Patients</h6>
                                <div className="count text-primary fs-20">{patientCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
