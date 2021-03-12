import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { patientCancelAppointments } from "../../../api/URLs";
import DoctorImage from "../../../assets/img/DoctorIcon.svg";
import { Table } from "../../../Components";
import { notification } from "../../../utils/notification";

export default function PatientDashboardAppointmentList({
  pendingAppointments,
  mutate
}) {
  let dataTable = [];
  if (pendingAppointments) {
    dataTable = pendingAppointments.map((pendingAppointment, index) => {
      return {
        "#": ++index,
        Photo: (
          <img
            src={DoctorImage}
            alt="hello"
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Title: pendingAppointment.appointmentTitle,
        "Reason for Appointment": pendingAppointment.reasonForAppointment,
        "Doctor's Name":
          `${pendingAppointment.doctor?.firstName} ${pendingAppointment.docotor?.lastName}` ??
          "N/A",
        "Doctor's Phone Number":
          pendingAppointment.doctor?.phoneNumber ?? "N/A",
        Actions: (
          <PendingAppointmentsTableAction appointment={pendingAppointment} mutate={mutate}/>
        ),
      };
    });
  }

  return (
    <div>
      <div className="card mb-0">
        <div className="card-header">Pending Appointments</div>
        <div className="card-body">
          <div className="table-responsive">
            <Table content={dataTable} />
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

const PendingAppointmentsTableAction = ({ appointment, mutate }) => {
  const cancelAppointments = async (id) => {
    try {
      const cancelPatientAppointment = patientCancelAppointments(id);
      const cancelPatientAppointmentConfig = fetchConfig({
        url: cancelPatientAppointment,
        method: "post",
      });
      const res = await fetchWrapper(cancelPatientAppointmentConfig);
      notification.success({ message: res.data.message });
      mutate()
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };
  return (
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
          type="button"
          className="btn btn-danger"
          onClick={(e) => cancelAppointments(appointment.id)}
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};
