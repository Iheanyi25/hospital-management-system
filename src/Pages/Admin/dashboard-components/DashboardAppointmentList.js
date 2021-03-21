import React from "react";
import { Table } from "../../../Components";
import formatDate from "../../../utils/formatDate";

export default function DashboardAppointmentList({ appointments }) {
  let dataTable = [];
  if (appointments) {
    dataTable = appointments.map((appointment, index) => {
        console.log(appointment)
      return {
        "#": ++index,
        "Appointment Title": appointment.appointmentTitle,
        "Patient Name": `${appointment?.patient?.firstName} ${appointment?.patient?.lastName}`,
        "Doctor Name": `${appointment?.doctor?.firstName} ${appointment?.doctor?.lastName}`,
        Date: formatDate(appointment.appointmentDate) || "",
        Status: appointment.isCompleted
          ? "COMPLETED"
          : appointment.isRejected
          ? "REJECTED"
          : appointment.isAccepted
          ? "ACCEPTED"
          : appointment.isCancelled
          ? "CANCELLED"
          : appointment.isPending
          ? "PENDING"
          : appointment.isExpired
          ? "EXPIRED"
          : "",
      };
    });
  }
  return (
    <div className="col col-md-12">
      <div className="card mb-0">
        <div className="card-header">Doctors Appointment List</div>
        <div className="card-body">
          <div className="table-responsive">
            {appointments && <Table
                content={dataTable}
                tableID={`appointment-${dataTable.length}`}
                key={`appointment-${dataTable.length}`}
              />}
          </div>
        </div>
      </div>
    </div>
  );
}
