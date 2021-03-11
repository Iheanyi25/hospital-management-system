import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";

function PatientsAttendedTableContainer({ patientsAttendedTo, category }) {
  let tableData = [];
  if (patientsAttendedTo) {
    tableData = patientsAttendedTo.map((consultation, index) => {
      return {
        "#": ++index,
        Title: consultation.patientQueue.consultationTitle,
        "Reason for consultation":
          consultation.patientQueue.reasonForConsultation,
        Patient: `${consultation.patient?.firstName} ${consultation.patient?.lastName}`,
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
        tableID={category + patientsAttendedTo.length}
        key={category + patientsAttendedTo.length}
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
