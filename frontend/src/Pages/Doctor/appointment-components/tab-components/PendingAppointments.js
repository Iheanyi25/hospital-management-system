import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mutate } from "swr";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import {
  getPendingAppointmentsWithDoctorUrl,
  postDoctorAcceptAppointmentUrl,
  getAcceptedAppointmentsWithDoctorUrl,
} from "../../../../api/URLs";
import { RejectAppointment, Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";
import { notification } from "../../../../utils/notification";

function PendingAppointmentsTableContainer({ doctorId }) {
  const [appointmentId, setAppointmentId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getDoctorAllAppointments = getPendingAppointmentsWithDoctorUrl(
    doctorId,
    pageNumber,
    pageSize
  );
  const getDoctorAllAppointmentsConfig = fetchConfig({
    url: getDoctorAllAppointments,
    method: "get",
  });
  const { data, error, mutate: refresh } = useRequest(
    getDoctorAllAppointmentsConfig,
    {
      revalidateOnFocus: false,
    }
  );

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
        const getUpdate = getAcceptedAppointmentsWithDoctorUrl(doctorId, 1, 50);
        const getUpdateConfig = fetchConfig({
          url: getUpdate,
          method: "get",
        });
        mutate(JSON.stringify(getUpdateConfig));
        console.log(mutate, 3333);
        await refresh();
      }
    } catch (err) {
      notification.error({ message: "Operation failed" });
    }
  };

  let tableData = [];
  if (data) {
    tableData = data?.appointments.map((pendingAppointment, index) => {
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
            setAppointmentId={setAppointmentId}
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
        tableID={"pending" + data?.appointments.length}
        key={"pending" + data?.appointments.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <RejectAppointment
        appointmentId={appointmentId}
        refresh={refresh}
        doctorId={doctorId}
      />
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
