import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getDoctorAppointmentsRejectedUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

const AppointmentsRejected = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const doctorAppointmentsCompleted = getDoctorAppointmentsRejectedUrl(
    pageNumber,
    pageSize
  );
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: doctorAppointmentsCompleted,
    method: "get",
  });
  const { data, error } = useRequest(getPatientsAttentedToCountConfig, {
    revalidateOnFocus: false,
  });

  if (error) return <div>failed to load</div>;
  let tableData = [];
  if (data) {
    tableData = data.appointments.map((appointment, index) => {
      return {
        "#": ++index,
        Patient: ` ${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
        Doctor: `${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`,
        "Appointment Date": formatDate(appointment?.appointmentDate),
        "Appointment Time": formatTime(appointment?.appointmentDate),
        Title: appointment?.appointmentTitle,
        "Reason for appointment": appointment?.reasonForAppointment,
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={"appointmentsRejected" + data?.appointments.length}
        key={"appointmentsRejected" + data?.appointments.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export { AppointmentsRejected };
