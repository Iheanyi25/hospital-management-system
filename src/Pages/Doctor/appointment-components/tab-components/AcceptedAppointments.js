import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function AcceptedAppointmentsTableContainer({ acceptedAppointments, category }) {
  let tableData = [];
  if (acceptedAppointments) {
    tableData = acceptedAppointments.map((acceptedAppointment, index) => {
      return {
        "#": ++index,
        Title: acceptedAppointment.appointmentTitle,
        "Reason for Appointment": acceptedAppointment.reasonForAppointment,
        Patient: `${acceptedAppointment.patient?.firstName} ${acceptedAppointment.patient?.lastName}`,
        "Patient Contact": acceptedAppointment.patient?.phoneNumber ?? "N/A",
        "Appointment Date": formatDate(acceptedAppointment.appointmentDate),
        "Appointment Time": formatTime(acceptedAppointment.appointmentTime),
        Actions: (
          <AcceptedAppointmentsTableAction
            acceptedAppointment={acceptedAppointment}
          />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + acceptedAppointments.length}
        key={category + acceptedAppointments.length}
      />
    </div>
  );
}

const AcceptedAppointmentsTableAction = ({ acceptedAppointment }) => {
  return (
    <ActionButton>
      <Link
        title="Go for clerking"
        to={{
          pathname: "/DoctorClarking",
          state: {
            id: acceptedAppointment.id,
            type: "appointment",
            patient: acceptedAppointment.patient,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="mr-3 btn-icon icofont-user" />
        Go for Clerking
      </Link>
      <Link
        title="Clarking History"
        to={{
          pathname: "/ViewClarkingHistory",
          state: {
            id: acceptedAppointment.patient.id,
            firstName: acceptedAppointment.patient.firstName,
            lastName: acceptedAppointment.patient.lastName,
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
            id: acceptedAppointment.patient.id,
            firstName: acceptedAppointment.patient.firstName,
            lastName: acceptedAppointment.patient.lastName,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
        Pre-Consultation History
      </Link>
    </ActionButton>
  );
};
export { AcceptedAppointmentsTableContainer };
