import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper } from "../../../../api/fetcher";
import {
  postDoctorAcceptAppointmentUrl,
  postDoctorRejectAppointmentUrl,
} from "../../../../api/URLs";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";
import { notification } from "../../../../utils/notification";

function PendingAppointmentsTableContainer({
  pendingAppointments,
  category,
  getDoctorAppointments,
}) {
  const acceptAppointment = async (e, id) => {
    e.preventDefault();

    try {
      const postDoctorAcceptAppointment = postDoctorAcceptAppointmentUrl(id);
      const postDoctorAcceptAppointmentConfig = fetchConfig({
        url: postDoctorAcceptAppointment,
        method: "post",
      });
      const { status } = await fetchWrapper(postDoctorAcceptAppointmentConfig);
      if (status === 200) {
        notification.success({ message: "Appointment accepted successfully" });
        getDoctorAppointments();
      }
    } catch (err) {
      notification.error({ message: "Operation failed" });
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
      const { status } = await fetchWrapper(postDoctorRejectAppointmentConfig);
      if (status === 200) {
        notification.success({ message: "Appointment rejected successfully" });
        getDoctorAppointments();
      }
    } catch (err) {
        notification.error({ message: "Operation failed" });
    }
  };

  let tableData = [];
  if (pendingAppointments) {
    tableData = pendingAppointments.map((pendingAppointment, index) => {
      return {
        "#": ++index,
        Title: pendingAppointment.appointmentTitle,
        "Reason for Appointment": pendingAppointment.reasonForAppointment,
        Patient: `${pendingAppointment.patient?.firstName} ${pendingAppointment.patient?.lastName}`,
        "Patient Contact": pendingAppointment.patient?.phoneNumber ?? "N/A",
        "Appointment Date": formatDate(pendingAppointment.appointmentDate),
        "Appointment Time": formatTime(pendingAppointment.appointmentTime),
        Actions: (
          <PendingAppointmentsTableAction
            pendingAppointment={pendingAppointment}
            acceptAppointment={acceptAppointment}
            rejectAppointment={rejectAppointment}
          />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + pendingAppointments.length}
        key={category + pendingAppointments.length}
      />
    </div>
  );
}

const PendingAppointmentsTableAction = ({
  pendingAppointment,
  acceptAppointment,
  rejectAppointment,
}) => {
  return (
    <ActionButton>
      <Link
        title="Accept Appointment"
        onClick={(e) => acceptAppointment(e, pendingAppointment.id)}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-2" />
        Accept Appointment
      </Link>
      <Link
        title="Reject Appointment"
        onClick={(e) => rejectAppointment(e, pendingAppointment.id)}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-2" />
        Reject Appointment
      </Link>
    </ActionButton>
  );
};
export { PendingAppointmentsTableContainer };
