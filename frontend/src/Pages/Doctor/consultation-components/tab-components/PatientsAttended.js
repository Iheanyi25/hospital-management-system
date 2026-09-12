import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getConsultationsCompletedWithDoctorUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import { UserContext } from "../../../../mobx/UserState";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

const PatientsAttendedTableContainer = observer(({ doctorId }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const patientsAttentedToCount = getConsultationsCompletedWithDoctorUrl(
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
    tableData = data?.consultations.map((consultation, index) => {
      return {
        "#": ++index,
        Title: consultation.consultationTitle,
        "Reason for consultation": consultation.reasonForConsultation,
        Patient: `${consultation.patient?.firstName} ${consultation.patient?.lastName}`,
        "Patient Contact": consultation?.patient?.phoneNumber ?? "N/A",
        "Consultation Date": formatDate(consultation.dateOfConsultation),
        "Consultation Time": formatTime(consultation.dateOfConsultation),
        Actions: (
          <PatientsAttendedTableAction
            consultation={consultation}
            userType={userType}
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
        tableID={"patientsAttendedTo" + data?.consultations.length}
        key={"patientsAttendedTo" + data?.consultations.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
});

const PatientsAttendedTableAction = ({ consultation, userType }) => {
  return (
    <ActionButton>
      <Link
        title="Patient Profile"
        to={{
          pathname:
            userType === "Admin"
              ? `/AdminPatientProfile/${consultation.patient.id}`
              : `/DoctorPatientProfile/${consultation.patient.id}`,
          state: consultation.patient,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-ui-edit  mr-2" /> View Profile
      </Link>
    </ActionButton>
  );
};
export { PatientsAttendedTableContainer };
