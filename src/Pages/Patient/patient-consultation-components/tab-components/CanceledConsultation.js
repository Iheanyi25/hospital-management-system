import React, { useState } from "react";
import { Table } from "../../../../Components";
import DoctorImage from "../../../../assets/img/DoctorIcon.svg";
import { getPatientCanceledConsulationsUrl } from "../../../../api/URLs";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";

const CanceledConsultation = ({ patientId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getDoctorAllAppointments = getPatientCanceledConsulationsUrl(
    patientId,
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
      };
    });
  }

  if (error) return <div>failed to load</div>;
  return (
    <div>
      <Table
        content={tableData}
        tableID={"pending" + data?.consultations.length}
        key={"pending" + data?.consultations.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export { CanceledConsultation };
