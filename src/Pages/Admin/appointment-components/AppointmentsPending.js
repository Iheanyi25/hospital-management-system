import { observer } from "mobx-react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getDoctorAppointmentsPendingUrl,
  deleteAppointmentUrl,
} from "../../../api/URLs";
import { Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import { ReAssign } from "../../../Components/Modals/ReAssignModal";
import { UserContext } from "../../../mobx/UserState";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";
import { notification } from "../../../utils/notification";

const AppointmentsPending = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const doctorAppointmentsPending = getDoctorAppointmentsPendingUrl(
    pageNumber,
    pageSize
  );
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: doctorAppointmentsPending,
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
        Patient: `${appointment.patient?.lastName} ${appointment.patient?.firstName}`,
        Doctor: `${appointment.doctor?.lastName} ${appointment.doctor?.firstName}`,
        "Appointment Date": formatDate(appointment?.appointmentDate),
        "Appointment Time": formatTime(appointment?.appointmentDate),
        Title: appointment?.appointmentTitle,
        "Reason for appointment": appointment?.reasonForAppointment,
        Actions: (
          <AppointmentsPendingActionTable
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
        tableID={"appointmentsPending" + data?.appointments.length}
        key={"appointmentsPending" + data?.appointments.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export const AppointmentsPendingActionTable = observer(
  ({ appointment, mutate, deleteAppointment }) => {
    const {
      user: { userType },
    } = useContext(UserContext);
    return (
      <div>
        <ActionButton>
          <Link
            title="Go For Pre-consultation"
            to={
              userType === "Nurse"
                ? `/NursePreConsultation/${appointment.patient.id}`
                : `/AdminPreConsultation/${appointment.patient.id}`
            }
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-stethoscope-alt mr-2" />
            Go For Preconsultation
          </Link>
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
          <button
            className="btn btn-sm btn-block"
            data-toggle="modal"
            data-target={`#reassign-patient-${appointment.id}`}
          >
            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
            Reassign to Doctor
          </button>
          <button
            className="btn btn-sm btn-block"
            onClick={() => deleteAppointment(appointment.id)}
          >
            <span className="mr-3 btn-icon icofont-delete-alt" />
            Delete Appointment
          </button>
        </ActionButton>
        <ReAssign
          idType="consultationId"
          route={"ReassignAppointment"}
          reRun={mutate}
          id={appointment.id}
        />
      </div>
    );
  }
);
export default AppointmentsPending;
