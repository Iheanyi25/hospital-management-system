import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { postDoctorAcceptAppointmentUrl, postDoctorRejectAppointmentUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";

const AppointmentTabContent = ({
  acceptedAppointments,
  pendingAppointments,
  completedAppointments,
  getDoctorAppointments,
}) => {
  const acceptAppointment = async (e, id) => {
    e.preventDefault();

    try {
      const postDoctorAcceptAppointment = postDoctorAcceptAppointmentUrl(id);
      const postDoctorAcceptAppointmentConfig = fetchConfig({
        url: postDoctorAcceptAppointment,
        method: "post",
      });
      const res = await fetchWrapper(postDoctorAcceptAppointmentConfig);
      console.log(res);
      getDoctorAppointments();
    } catch (err) {
        console.log(err);
    }
  };

  const rejectAppointment = async (e, id) => {
    e.preventDefault();

    try {
      const postDoctorRejectAppointment = postDoctorRejectAppointmentUrl(id);
      const postDoctorRejectAppointmentConfig = fetchConfig({
        url: postDoctorRejectAppointment,
        method: "post",
      });
      const res = await fetchWrapper(postDoctorRejectAppointmentConfig);
      console.log(res, 33333);
      getDoctorAppointments();
    } catch (err) {
        console.log(err);
    }
  };

//   const cancelAppointment = async (e, id) => {
//     e.preventDefault();

//     try {
//       const postDoctorCancelAppointment = postDoctorCancelAppointmentUrl(id);
//       const postDoctorCancelAppointmentConfig = fetchConfig({
//         url: postDoctorCancelAppointment,
//         method: "post",
//       });
//       const res = await fetchWrapper(postDoctorCancelAppointmentConfig);
//       console.log(res);
//       getDoctorAppointments();
//     } catch (err) {
//         console.log(err);
//     }
//   };
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-pending"
          role="tabpanel"
          aria-labelledby="pills-pending-tab"
        >
          <div className="table-responsive">
            <table
              className="table table-striped"
              data-paging="true"
              data-info="true"
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Reason for Appointment</th>
                  <th className="text-nowrap">Patient</th>
                  <th className="text-nowrap">Patient Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments
                  ? pendingAppointments.map((appointment) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            {appointment.appointmentTitle}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {appointment.reasonForAppointment}
                          </div>
                        </td>
                        <td>
                          {appointment.patient?.firstName}{" "}
                          {appointment.patient?.lastName}
                        </td>
                        <td>{appointment.patient?.phoneNumber} </td>
                        <td>
                          <div className="text-muted text-nowrap">
                            {formatDate(appointment.appointmentDate) ?? ""}
                          </div>
                        </td>
                        <td>
                          <div className="text-muted text-nowrap">
                            {formatTime(appointment.appointmentTime) ?? ""}
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
                              <button
                                title="Accept Appointment"
                                onClick={(e) =>
                                  acceptAppointment(e, appointment.id)
                                }
                                className="btn btn-sm btn-block"
                              >
                                <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                Accept Appointment
                              </button>
                              <button
                                title="Reject Appointment"
                                onClick={(e) =>
                                  rejectAppointment(e, appointment.id)
                                }
                                className="btn btn-sm btn-block"
                              >
                                <span className="btn-icon icofont-stethoscope-alt mr-2" />
                                Reject Appointment
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-accepted-tab"
        >
          <div className="table-responsive">
            <table
              className="table table-striped"
              data-paging="true"
              data-info="true"
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Reason for Appointment</th>
                  <th className="text-nowrap">Patient</th>
                  <th className="text-nowrap">Patient Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {acceptedAppointments
                  ? acceptedAppointments.map((appointment) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            {appointment.appointmentTitle}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {appointment.reasonForAppointment}
                          </div>
                        </td>
                        <td>
                          {appointment.patient?.firstName}{" "}
                          {appointment.patient?.lastName}
                        </td>
                        <td>{appointment.patient?.phoneNumber} </td>
                        <td>
                          <div className="text-muted text-nowrap">
                            {formatDate(appointment.appointmentDate) ?? ""}
                          </div>
                        </td>
                        <td>
                          <div className="text-muted text-nowrap">
                            {formatTime(appointment.appointmentTime) ?? ""}
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
                              <Link
                                title="Pre-Consultation History"
                                to={{
                                  pathname: "/ViewPreConsultationHistory",
                                  state: {
                                    id: appointment.patient.id,
                                    firstName: appointment.patient.firstName,
                                    lastName: appointment.patient.lastName,
                                  },
                                }}
                                className="btn btn-sm btn-block"
                              >
                                <span className="mr-3 btn-icon icofont-stethoscope-alt" />
                                Pre-Consultation History
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          <div className="table-responsive">
            <table
              className="table table-striped"
              data-paging="true"
              data-info="true"
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Reason for Appointment</th>
                  <th className="text-nowrap">Patient</th>
                  <th className="text-nowrap">Patient Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedAppointments
                  ? completedAppointments.map((appointment) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            {appointment.appointmentTitle}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {appointment.reasonForAppointment}
                          </div>
                        </td>
                        <td>
                          {appointment.patient?.firstName}{" "}
                          {appointment.patient?.lastName}
                        </td>
                        <td>{appointment.patient?.phoneNumber} </td>
                        <td>
                          <div className="text-muted text-nowrap">
                            {formatDate(appointment.appointmentDate) ?? ""}
                          </div>
                        </td>
                        <td>
                          <div className="text-muted text-nowrap">
                            {formatTime(appointment.appointmentTime) ?? ""}
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
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AppointmentTabContent };
