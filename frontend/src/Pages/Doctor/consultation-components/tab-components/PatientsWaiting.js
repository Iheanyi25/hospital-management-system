import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getConsultationsWithDoctorUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function PatientsWaitingTableContainer({ doctorId }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const patientsAttentedToCount = getConsultationsWithDoctorUrl(
    doctorId,
    pageNumber,
    pageSize
  );
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: patientsAttentedToCount,
    method: "get",
  });
  const { data, error } = useRequest(getPatientsAttentedToCountConfig, {
    revalidateOnFocus: false,
  });

  let tableData = [];
  if (data) {
    tableData = data?.consultations.map((patientWaiting, index) => {
      return {
        "#": ++index,
        Title: patientWaiting.consultationTitle,
        "Reason for consultation": patientWaiting.reasonForConsultation,
        Patient: `${patientWaiting.patient?.firstName} ${patientWaiting.patient?.lastName}`,
        "Patient Contact": patientWaiting?.patient?.phoneNumber ?? "N/A",
        "Consultation Date": formatDate(patientWaiting.dateOfConsultation),
        "Consultation Time": formatTime(patientWaiting.dateOfConsultation),
        Actions: <PatientsWaitingActionTable patientWaiting={patientWaiting} />,
      };
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <div>
      <Table
        content={tableData}
        tableID={"patientsWaiting" + data?.consultations.length}
        key={"patientsWaiting" + data?.consultations.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
}

const PatientsWaitingActionTable = ({ patientWaiting }) => {
  return (
    <ActionButton>
      <Link
        title="Clarking"
        to={{
          pathname: "/DoctorClarking",
          state: {
            type: "consultation",
            id: patientWaiting.id,
            patient: patientWaiting.patient,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-3" />
        Go to Clarking
      </Link>
      <Link
        title="Clarking History"
        to={{
          pathname: "/ViewClarkingHistory",
          state: {
            id: patientWaiting.patient.id,
            firstName: patientWaiting.patient.firstName,
            lastName: patientWaiting.patient.lastName,
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-3" />
        View Clarking History
      </Link>
    </ActionButton>
  );
};
export { PatientsWaitingTableContainer };
