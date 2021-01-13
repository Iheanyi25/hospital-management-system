import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function PatientsOnOpenList({patientsOnOpenList, setConsultationId, deleteConsultation}) {
  return (
    <Fragment>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Appointment Title</th>
          <th>Reason For Appointment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patientsOnOpenList
          ? patientsOnOpenList.map((consultation) => (
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
                <td>{consultation.consultationTitle}</td>
                <td>
                  <div className="text-muted text-nowrap">
                    {consultation.reasonForConsultation}
                  </div>
                </td>

                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm btn-block dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <div className="dropdown-menu text-left">
                      <Link
                        title="Go for Clarking"
                        to={{
                          pathname: "/DoctorClarking",
                          state: {
                            id: consultation.id,
                            type: "consultation",
                            patient: consultation.patient,
                          },
                        }}
                        className="btn btn-sm btn-block"
                      >
                        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                        Go for Clarking
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
                      <button
                        className="btn btn-sm btn-block"
                        onClick={(e) =>
                          deleteConsultation(e, consultation.id)
                        }
                      >
                        <span className="mr-3 btn-icon icofont-delete-alt" />
                        Delete Consultation
                      </button>
                      <button
                        onClick={() =>
                            setConsultationId(consultation.id)
                        }
                        className="btn btn-sm btn-block"
                        data-toggle="modal"
                        data-target="#reassign-patient"
                      >
                        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                        ReAssign to Doctor
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </Fragment>
  );
}
