import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper } from "../../../../api/fetcher";
import { postDoctorAcceptAppointmentUrl } from "../../../../api/URLs";
import { RejectAppointment, Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";
import { notification } from "../../../../utils/notification";

function PendingAppointmentsTableContainer({
  pendingAppointments,
  category,
  mutate,
}) {
  const [appointmentId, setAppointmentId] = useState("");
  const acceptAppointment = async (e, id) => {
    e.preventDefault();

    try {
      const postDoctorAcceptAppointment = postDoctorAcceptAppointmentUrl(id);
      const postDoctorAcceptAppointmentConfig = fetchConfig({
        url: postDoctorAcceptAppointment,
        method: "post",
      });
      const res = await fetchWrapper(postDoctorAcceptAppointmentConfig);
      console.log(res, 222);
      if (res.status === 200) {
        notification.success({ message: "Appointment accepted successfully" });
        console.log(mutate, 3333);
        await mutate();
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
            // rejectAppointment={rejectAppointment}
            setAppointmentId={setAppointmentId}
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
      <RejectAppointment appointmentId={appointmentId} mutate={mutate} />
    </div>
  );
}

const PendingAppointmentsTableAction = ({
  pendingAppointment,
  acceptAppointment,
  setAppointmentId,
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
      <button
        title="Reject Appointment"
        data-toggle="modal"
        data-target="#reject-appointment"
        onClick={() => {
          setAppointmentId(pendingAppointment.id);
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-2" />
        Reject Appointment
      </button>
    </ActionButton>
  );
};
export { PendingAppointmentsTableContainer };
