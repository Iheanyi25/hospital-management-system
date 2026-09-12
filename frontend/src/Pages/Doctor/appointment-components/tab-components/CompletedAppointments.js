import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getCompletedAppointmentsWithDoctorUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function CompletedAppointmentsTableContainer({ doctorId }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getDoctorAllAppointments = getCompletedAppointmentsWithDoctorUrl(
    doctorId,
    pageNumber,
    pageSize
  );
  const getDoctorAllAppointmentsConfig = fetchConfig({
    url: getDoctorAllAppointments,
    method: "get",
  });
  const { data, error } = useRequest(getDoctorAllAppointmentsConfig, {
    revalidateOnFocus: false,
  });
  let tableData = [];
  if (data) {
    tableData = data?.appointments.map((completedAppointment, index) => {
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
  if (error) return <div>failed to load</div>;
  return (
    <div>
      <Table
        content={tableData}
        tableID={"completed" + data?.appointments.length}
        key={"completed" + data?.appointments.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
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
