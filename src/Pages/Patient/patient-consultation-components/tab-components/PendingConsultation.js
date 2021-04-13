import React, { useState } from "react";
import { Table } from "../../../../Components";
import DoctorImage from "../../../../assets/img/DoctorIcon.svg";
import {
  cancelPatientConsulationsUrl,
  getPatientPendingConsulationsUrl,
} from "../../../../api/URLs";
import { notification } from "../../../../utils/notification";
import { fetchConfig } from "../../../../api/fetchConfig";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";

const PendingConsultations = ({ patientId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getDoctorAllAppointments = getPatientPendingConsulationsUrl(
    patientId,
    pageNumber,
    pageSize
  );
  const getDoctorAllAppointmentsConfig = fetchConfig({
    url: getDoctorAllAppointments,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getDoctorAllAppointmentsConfig, {
    revalidateOnFocus: false,
  });
  let tableData = [];
  if (data) {
    tableData = data?.consultations.map((consultation) => {
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
        "Doctor's Name": consultation?.consultationTitle,
        "Consultation Title": consultation?.reasonForConsultation,
        "Reason For Consultation": `${
          consultation.doctor?.firstName || "Unassigned"
        } ${consultation.doctor?.lastName || ""}`,
        Date: new Date(consultation.dateOfConsultation).toDateString(),
        Actions: <ActionTable consultation={consultation} mutate={mutate} />,
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
    </div>
  );
};

const ActionTable = ({ consultation, mutate }) => {
  const cancelConsultation = async (id) => {
    try {
      const cancelPatientConsulations = cancelPatientConsulationsUrl(id);
      const cancelPatientConsulationsConfig = fetchConfig({
        url: cancelPatientConsulations,
        method: "patch",
      });
      const res = await fetchWrapper(cancelPatientConsulationsConfig);
      notification.success({ message: res.data.message });
      await mutate();
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };

  return (
    <ActionButton>
      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => cancelConsultation(consultation.id)}
      >
        Cancel Consultation
      </button>
    </ActionButton>
  );
};

export { PendingConsultations };
