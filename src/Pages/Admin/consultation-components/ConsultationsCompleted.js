import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getPatientConsultationsCompletedUrl } from "../../../api/URLs";
import { Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import formatDate from "../../../utils/formatDate";
import formatTme from "../../../utils/formatTime";

const ConsultationsCompleted = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const patientConsultationsCompletedCount = getPatientConsultationsCompletedUrl(
    pageNumber,
    pageSize
  );
  const getPatientConsultationsCompletedCountConfig = fetchConfig({
    url: patientConsultationsCompletedCount,
    method: "get",
  });
  const { data, error } = useRequest(
    getPatientConsultationsCompletedCountConfig,
    {
      revalidateOnFocus: false,
    }
  );
  if (error) return <div>failed to load</div>;
  let tableData = [];
  if (data) {
    tableData = data.consultations.map((consultation, index) => {
      return {
        "#": ++index,
        Patient: `${consultation.patient?.lastName} ${consultation.patient?.firstName}`,
        Doctor: `${consultation.doctor?.lastName || "unassigned"} ${
          consultation.doctor?.firstName || ""
        } `,
        "Consultation Time": formatTme(consultation?.dateOfConsultation),
        "Consultation Date": formatDate(consultation?.dateOfConsultation),
        Title: consultation?.consultationTitle,
        "Reason for consultation": consultation?.reasonForConsultation,
        Actions: (
          <ConsultationsCompletedActionTable consultation={consultation} />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={"withDoctors" + data?.consultations.length}
        key={"withDoctors" + data?.consultations.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export const ConsultationsCompletedActionTable = ({ consultation }) => {
  return (
    <ActionButton>
      <Link
        title="Clarking History"
        to={{
          pathname: "/ViewClarkingHistory",
          state: {
            id: consultation.patient.id,
            firstName: consultation.patient.firstName,
            lastName: consultation.patient.lastName,
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
export default ConsultationsCompleted;
