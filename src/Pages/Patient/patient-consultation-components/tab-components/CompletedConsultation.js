import React, { useState } from "react";
import { Table } from "../../../../Components";
import DoctorImage from "../../../../assets/img/DoctorIcon.svg";
import { getPatientCompletedConsulationsUrl } from "../../../../api/URLs";
import { fetchConfig } from "../../../../api/fetchConfig";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import {  useRequest } from "../../../../api/fetcher";
import { Link } from "react-router-dom";

const CompletedConsultation = ({ patientId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getDoctorAllAppointments = getPatientCompletedConsulationsUrl(
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
        tableID={"completed" + data?.consultations.length}
        key={"completed" + data?.consultations.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

const ActionTable = () => {
  return (
    <ActionButton>
      <Link
        type="button"
        className="btn btn-primary"
        to="/PatientClarkingHistory"
      >
        View Clerking History
      </Link>
    </ActionButton>
  );
};

export { CompletedConsultation };
