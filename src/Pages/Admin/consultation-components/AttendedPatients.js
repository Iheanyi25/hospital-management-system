import React, { Fragment }  from "react";
import { Link } from "react-router-dom";

export default function AttendedPatients({patientsAttendedTo}) {
  return (
    <Fragment>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          {/* <th>Phone</th> */}
          <th>Appointment Title</th>
          <th className="nowrap">Reason For Appointment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patientsAttendedTo
          ? patientsAttendedTo.map((consultation) => (
              <tr>
                <td>
                  <img
                    src="../assets/content/user-40-1.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-500"
                  />
                </td>
                <td className="nowrap">
                  {consultation.patient.firstName}{" "}
                  {consultation.patient.lastName}
                </td>
                {/* <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                        {consultation.patient.phoneNumber}
                                      </div>
                                    </td> */}
                <td>{consultation.consultationTitle}</td>
                <td>
                  <div className="text-muted text-nowrap">
                    {consultation.reasonForConsultation}
                  </div>
                </td>

                <td>
                  <div className="actions">
                    <Link
                      title="Pre-consultation"
                      to={`/AdminPreConsultation/${consultation.id}`}
                      className="btn btn-primary btn-sm btn-square rounded-pill"
                    >
                      <span className="btn-icon icofont-stethoscope-alt" />
                    </Link>
                    <Link
                      title="Clarking History"
                      to={{
                        pathname: "/ViewClarkingHistory",
                        state: {
                          id: consultation.patient.id,
                          firstName: consultation.patient.firstName,
                          lastName: consultation.patient.lastName,
                        },
                      }}
                      className="btn btn-sm btn-block"
                    >
                      <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                      Clarking History
                    </Link>
                    {/* <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button> */}
                  </div>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </Fragment>
  );
}
