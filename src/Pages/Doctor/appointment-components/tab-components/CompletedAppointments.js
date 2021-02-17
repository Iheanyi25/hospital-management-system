import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function CompletedAppointmentsTableContainer({
  completedAppointments,
  category,
}) {
  let tableData = [];
  if (completedAppointments) {
    tableData = completedAppointments.map((completedAppointment, index) => {
      return {
        "#": ++index,
        Title: completedAppointment.appointmentTitle,
        "Reason for Appointment": completedAppointment.reasonForAppointment,
        Patient: `${completedAppointment.patient?.firstName} ${completedAppointment.patient?.lastName}`,
        "Patient Contact": completedAppointment.patient?.phoneNumber ?? "N/A",
        "Appointment Date": formatDate(completedAppointment.appointmentDate),
        "Appointment Time": formatTime(completedAppointment.appointmentTime),
        Actions: (
          <AcceptedAppointmentsTableAction
            completedAppointment={completedAppointment}
          />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + completedAppointments.length}
        key={category + completedAppointments.length}
      />
    </div>
  );
}

const AcceptedAppointmentsTableAction = ({ completedAppointment }) => {
  return (
    <ActionButton>
      <Link
        title="Clarking History"
        to={{
          pathname: "/ViewClarkingHistory",
          state: {
            id: completedAppointment.patient.id,
            firstName: completedAppointment.patient.firstName,
            lastName: completedAppointment.patient.lastName,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
        Clarking History
      </Link>
    </ActionButton>
  );
};
export { CompletedAppointmentsTableContainer };
