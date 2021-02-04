import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getPatientsUrl } from "../../api/URLs";
import { PageLoader, Table } from "../../Components";
import TableSize from "../../Components/DataTable/TableSize";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import ActionButton from "../../Components/DataTable/ActionButton";
import ReceiptModal from "../../Components/Modals/ReceiptModal";

function AllPatients() {
  const getPatients = getPatientsUrl();
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data, error } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });

  let dataTable = []
    if (data) {
      dataTable = data.patients.map(({ patient }, index) => {
        console.log(patient,111)
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
          Name: `${patient.firstName} ${patient.lastName}`,
          Email: <a href={"mailto:" + patient.email}>{patient.email}</a>,
          Phone: patient.phoneNumber || "Not available",
          Actions: <PatientTableAction patient={patient} />,
        };
      });
    }
  

  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header">
            <h4 className="page-title">Our Patients</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.patients.length : 0}
              heading="No Of Patients"
            />
          </div>
          <div className="page-content">
            {data && <Table content={dataTable} />}
          </div>
        </div>
      </main>
      <ReceiptModal modalId="view-reciept">
        {/* <PatientInvoiceReceipt /> */}
      </ReceiptModal>
    </Fragment>
  );
}

const PatientTableAction = ({ patient }) => {
  const tableFunctions = [
    {
      text: "Update Profile",
      path: `/AdminUpdatePatientProfile/${patient.id}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
    {
      text: "View Profile",
      path: `/AdminPatientProfile/${patient.id}`,
      iconClass: "btn-icon icon sli-user mr-2",
    },
    {
      text: " Go for Pre-Consultation",
      path: `/AdminPreConsultation/${patient.id}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
    {
      text: "Pre-Consultation History",
      path: `/AdminUpdatePatientProfile/${patient.id}`,
      iconClass: "btn-icon icofont-stethoscope-alt mr-2",
    },
    {
      text: "Clarking History",
      path: `/AdminViewClarkingHistory/${patient.id}`,
      iconClass: "btn-icon icofont-stethoscope-alt mr-2",
    },
    {
      text: "View Health History",
      path: `/AdminViewPatientHealthHistory/${patient.id}`,
      iconClass: "btn-icon icofont-stethoscope-alt mr-2",
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass },index) => (
        <NavLink
          to={{
            pathname: path,
            state: patient,
          }}
          className="btn btn-sm btn-block"
          key={path+index}
        >
          <span className={iconClass} />
          {text}
        </NavLink>
      ))}
      <NavLink
        to="#"
        className="btn btn-sm btn-block"
        data-toggle="modal"
        data-target="#view-reciept"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Reciept
      </NavLink>
    </ActionButton>
  );
};

export default AllPatients;
