import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function PendingAppointments({pendingAppointments, setAppointmentId, deleteAppointment}) {
  return (
    <Fragment>
      <thead>
        <tr>
          <th>Title</th>
          <th>Reason for appointment</th>
          <th className="text-nowrap">Doctor</th>
          <th className="text-nowrap">Patient</th>
          <th>Appointment Date</th>
          <th>Appointment Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pendingAppointments
          ? pendingAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>
                  {" "}
                  <strong>{appointment?.appointmentTitle ?? " "}</strong>
                </td>
                <td>
                  <strong>{appointment?.reasonForAppointment ?? ""}</strong>
                </td>
                <td>
                  <div className="d-flex align-items-center nowrap">
                    {appointment.doctor?.lastName ?? ""}{" "}
                    {appointment.doctor?.firstName ?? ""}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {appointment.patient?.lastName ?? ""}{" "}
                    {appointment.patient?.firstName ?? ""}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {new Date(
                      appointment?.appointmentDate
                    ).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {new Date(
                      appointment?.appointmentDate
                    ).toLocaleTimeString()}
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
                        to={`/AdminPreConsultation/${appointment.patient.id}`}
                        className="btn btn-sm btn-block"
                      >
                        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                        Pre Consultation
                      </Link>
                      <Link
                        title="Go for clarking"
                        to={{
                          pathname: "/DoctorClarking",
                          state: {
                            id: appointment.id,
                            type: "appointment",
                            patient: appointment.patient,
                          },
                        }}
                        className="btn btn-sm btn-block"
                      >
                        <span className="btn-icon icofont-user" />
                        Go for Clarking
                      </Link>
                      <Link
                        title="Clarking History"
                        to={{
                          pathname: "/ViewClarkingHistory",
                          state: {
                            id: appointment.patient.id,
                            firstName: appointment.patient.firstName,
                            lastName: appointment.patient.lastName,
                          },
                        }}
                        className="btn btn-sm btn-block"
                      >
                        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                        Clarking History
                      </Link>
                      <button
                        onClick={() =>
                            setAppointmentId(appointment.id)
                        }
                        className="btn btn-sm btn-block"
                        data-toggle="modal"
                        data-target="#reassign-patient"
                      >
                        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                        ReAssign to Doctor
                      </button>
                      <button
                        className="btn btn-sm btn-block"
                        onClick={(e) => deleteAppointment(appointment.id)}
                      >
                        <span className="mr-3 btn-icon icofont-delete-alt" />
                        Delete Consultation
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
