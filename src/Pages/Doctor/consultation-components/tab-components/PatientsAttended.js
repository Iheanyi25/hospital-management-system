import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";

function PatientsAttendedTableContainer({ completedConsultations, category }) {
  let tableData = [];
  if (completedConsultations) {
    tableData = completedConsultations.map((consultation, index) => {
      return {
        "#": ++index,
        Title: consultation.patientQueue.consultationTitle,
        "Reason for consultation":
          consultation.patientQueue.reasonForConsultation,
        Patient: `${consultation.patient?.lastName} ${consultation.patient?.firstName}`,
        "Patient Contact": consultation?.patient?.phoneNumber ?? "N/A",
        "Consultation Date": new Date(
          consultation.patientQueue.dateOfConsultation
        ).toLocaleDateString(),
        "Consultation Time": new Date(
          consultation.patientQueue.dateOfConsultation
        ).toLocaleTimeString(),
        Actions: <PatientsAttendedTableAction consultation={consultation} />,
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + completedConsultations.length}
        key={category + completedConsultations.length}
      />
    </div>
  );
}

const PatientsAttendedTableAction = ({ consultation }) => {
  return (
    <ActionButton>
      <Link
        title="Patient Profile"
        to={{
          pathname: `/DoctorPatientProfile/${consultation.patient.id}`,
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
