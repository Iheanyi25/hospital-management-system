import React from "react";
import { Table } from "../../../Components";
import PatientAndAdminImage from "../../../assets/img/PatientAndAdminIcon.svg";
import { Link } from "react-router-dom";
import ActionButton from "../../../Components/DataTable/ActionButton";

export default function DoctorPatientList({
  patients,
  headerText,
  patientListId,
}) {
  let dataTable = [];
  if (patients) {
    dataTable = patients.map(({ patient }, index) => {
      console.log(patient, 111);
      return {
        "#": ++index,
        Photo: (
          <img
            src={PatientAndAdminImage}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        "Patient Name": `${patient.firstName} ${patient.lastName}`,
        Email: <a href={"mailto:" + patient.email}>{patient.email}</a>,
        Phone: patient.phoneNumber || "Not available",
        Actions:
          patientListId === "my-patient" ? (
            <MyPatientListTableAction patient={patient} />
          ) : (
            <PatientListTableAction patient={patient} />
          ),
      };
    });
  }
  return (
    <div>
      <header className="page-header">
        <h4 className="page-title">{headerText}</h4>
      </header>
      <Table content={dataTable} />
    </div>
  );
}

const MyPatientListTableAction = ({ patient }) => {
  return (
    <ActionButton>
      <Link
        title="Patient Profile"
        to={{
          pathname: `/DoctorPatientProfile/${patient.id}`,
          state: patient,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-ui-edit  mr-2" /> Patient Profile
      </Link>
    </ActionButton>
  );
};

const PatientListTableAction = ({ patient }) => {
  const patientActionLinks = [
    {
      icon: "icofont-stethoscope-alt",
      pathname: "/DoctorServiceRequests",
      text: " Services History",
      title: "Service",
    },
    {
      icon: "icofont-stethoscope-alt",
      pathname: "/DoctorPreConsultationHistory",
      text: " Pre-Consultation History",
      title: "Pre-consultation",
    },
    {
      icon: "icofont-ui-edit",
      pathname: "/DoctorClarkingHistory",
      text: "Clarking History",
      title: "Clarking",
    },
    {
      icon: "icofont-ui-edit",
      pathname: "/DoctorPatientProfile",
      text: "Patient Profile",
      title: "Patient Profile",
    },
  ];
  return (
    <div>
      <ActionButton>
        {patientActionLinks.map(({ text, icon, pathname, title }) => (
          <Link
            title={title}
            to={{
              pathname: `${pathname}/${patient.id}`,
              state: patient,
            }}
            className="btn btn-sm btn-block"
          >
            <span className={` btn-icon ${icon}  mr-2`} />
            {text}
          </Link>
        ))}
      </ActionButton>
    </div>
  );
};
