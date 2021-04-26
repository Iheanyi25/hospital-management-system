import { observer } from "mobx-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import {
  getDoctorAppointmentsCompletedUrl,
  deleteAppointmentUrl,
} from "../../../../api/URLs";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";
import { notification } from "../../../../utils/notification";

const AppointmentsCompleted = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const doctorAppointmentsCompleted = getDoctorAppointmentsCompletedUrl(
    pageNumber,
    pageSize
  );
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: doctorAppointmentsCompleted,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getPatientsAttentedToCountConfig, {
    revalidateOnFocus: false,
  });

  const deleteAppointment = async (id) => {
    try {
      const deleteAppointment = deleteAppointmentUrl();
      const deleteAppointmentConfig = fetchConfig({
        url: deleteAppointment,
        data: JSON.stringify({ appointmentId: id }),
        method: "post",
      });
      const res = await fetchWrapper(deleteAppointmentConfig);
      await mutate();
      notification.success({ message: res.data.message });
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

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
        Actions: (
          <AppointmentsCompletedActionTable
            appointment={appointment}
            deleteAppointment={deleteAppointment}
            mutate={mutate}
          />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={"appointmentsCompleted" + data?.appointments.length}
        key={"appointmentsCompleted" + data?.appointments.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export const AppointmentsCompletedActionTable = observer(({ appointment }) => {
  return (
    <div>
      <ActionButton>
        <Link
          title="Clerking History"
          to={{
            pathname: `/ViewClarkingHistory`,
            state: appointment.patient,
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Clerking History
        </Link>
      </ActionButton>
    </div>
  );
});
export { AppointmentsCompleted };
