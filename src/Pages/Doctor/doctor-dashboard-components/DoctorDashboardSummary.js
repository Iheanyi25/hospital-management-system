import React from 'react'

export default function DoctorDashboardSummary({allCounts}) {
    const {
        completedAppoinmentsCount,
        completedConsultationCount,
        pendingAppoinmentsCount,
        pendingConsultationsCount,
      } = allCounts;
    
      const counts = [
        { title: "Pending Appointments", count: pendingAppoinmentsCount },
        { title: "Completed Appointments", count: completedAppoinmentsCount },
        { title: "Pending Consultations", count: pendingConsultationsCount },
        { title: "Completed Consultations", count: completedConsultationCount },
      ];
      return (
        <div className="row">
          {counts.map(({title, count}) => (
            <PatientCountContainer
              title={title}
              count={count}
            />
          ))}
        </div>
      );
    }
    
    const PatientCountContainer = ({ title, count }) => {
      return (
        <div className="col col-12 col-md-6 col-xl-4">
          <div className="card animated fadeInUp delay-03s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-5">
                  <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                </div>
                <div className="col col-7">
                  <h6 className="mt-0 mb-1">{title}</h6>
                  <div className="count text-primary fs-20">{count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
