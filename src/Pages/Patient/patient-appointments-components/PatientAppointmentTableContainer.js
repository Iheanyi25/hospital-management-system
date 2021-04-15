import React, { useContext, useState } from "react";
import { Table } from "../../../Components";
import DoctorImage from "../../../assets/img/DoctorIcon.svg";
import {
  CompletedPatientAppointmentTableAction,
  PendingPatientAppointmentTableAction,
} from "./PatientAppointmentTableActions";
import { cancelPatientAppointmentUrl } from "../../../api/URLs";
import { notification } from "../../../utils/notification";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { UserContext } from "../../../mobx/UserState";
import {
  getPatientDashboardUrl,
  getPatientCancelledAppointmentsUrl,
} from "../../../api/URLs";
import { mutate as refetch } from "swr";

export default function PatientAppointmentTableContainer({ url, category }) {
  const {
    user: { id: patientId },
  } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getPatientAppointments = url(patientId, pageNumber, pageSize);
  const getPatientAppointmentsConfig = fetchConfig({
    url: getPatientAppointments,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getPatientAppointmentsConfig, {
    refreshWhenHidden: true,
  });
  let tableData = [];
  if (data) {
    tableData = data?.appointments?.map((appointment) => {
      return {
        "#": (
          <img
            src={DoctorImage}
            alt="hello"
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        "Doctor's Name": `${appointment.doctor?.lastName || "unassigned"} ${
          appointment.doctor?.firstName || ""
        } `,
        "Appointment Title": appointment?.reasonForAppointment,
        "Reason For Appointment": appointment?.appointmentTitle,
        Date: new Date(appointment.appointmentDate).toDateString(),
        [category !== "cancelled" ? "Actions" : ""]: ( category !== "cancelled" &&
          <PatientAppointmentTableActionsContainer
            appointment={appointment}
            category={category}
            mutate={mutate}
            patientId={patientId}
          />
        ),
      };
    });
  }

  if (error) return <div>failed to load</div>;
  return (
    <div>
      {data && (
        <Table
          content={tableData}
          tableID={category + tableData?.length}
          key={category + tableData.length}
          paginationDetails={data?.paginationDetails}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </div>
  );
}

const PatientAppointmentTableActionsContainer = ({
  appointment,
  category,
  mutate,
  patientId,
}) => {
  const cancelAppointment = async (id) => {
    try {
      const cancelPatientAppointment = cancelPatientAppointmentUrl(id);
      const cancelPatientAppointmentConfig = fetchConfig({
        url: cancelPatientAppointment,
        method: "post",
      });
      const res = await fetchWrapper(cancelPatientAppointmentConfig);
      notification.success({ message: res.data.message });
      mutate();

      refetch(appointmentCountsStr(patientId));
      refetch(cancelAppointmentStr(patientId));
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };
  const categories = {
    pending: (
      <PendingPatientAppointmentTableAction
        id={appointment.id}
        cancelAppointment={cancelAppointment}
      />
    ),
    completed: (
      <CompletedPatientAppointmentTableAction appointment={appointment} />
    ),
  };

  return <div>{categories[category] || " "}</div>;
};

const appointmentCountsStr = (patientId) => {
  const getPatientAllCounts = getPatientDashboardUrl(patientId);
  const getPatientAllCountsConfig = fetchConfig({
    url: getPatientAllCounts,
    method: "get",
  });
  return JSON.stringify(getPatientAllCountsConfig);
};

const cancelAppointmentStr = (patientId) => {
  const getPatientAppointments = getPatientCancelledAppointmentsUrl(
    patientId,
    1,
    50
  );
  const getPatientAppointmentsConfig = fetchConfig({
    url: getPatientAppointments,
    method: "get",
  });
  return JSON.stringify(getPatientAppointmentsConfig);
};
