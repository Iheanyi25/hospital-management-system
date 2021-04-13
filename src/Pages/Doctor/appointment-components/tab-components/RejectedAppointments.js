import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getDoctorAppointmentsRejectedUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function RejectedAppointmentsTableContainer({ doctorId }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getDoctorAllAppointments = getDoctorAppointmentsRejectedUrl(
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
      };
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <div>
      <Table
        content={tableData}
        tableID={"rejected" + data?.appointments.length}
        key={"rejected" + data?.appointments.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
}
export { RejectedAppointmentsTableContainer };
