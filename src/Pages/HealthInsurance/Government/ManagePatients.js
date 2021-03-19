import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManagePatients = () => {
  const data = {
    patients: [
      { user: "Mark" },
      { user: "Jacob" },
      { user: "Larry" },
      { user: "Jacob" },
      { user: "Mark" },
    ],
  };
  let dataTable = [];
  if (data) {
    dataTable = data.patients.map(({ user }, index) => {
      return {
        "#": ++index,
        Users: user,
        Actions: <NHISPatientActionTable />,
      };
    });
  }
  //   if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Manage Patients</h4>
            <Link className="btn btn-primary" to="/AdminCreateNHIS">
              Add patient
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.patients.length : 0}
              heading="Total Patients"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                // paginationDetails={data.paginationDetails}
                // setPageNumber={setPageNumber}
                // pageNumber={pageNumber}
                // pageSize={pageSize}
                // setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
const NHISPatientActionTable = () => {
  return (
    <ActionButton>
      <Link
        // to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Edit patient
      </Link>
      <Link
        // to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </Link>
    </ActionButton>
  );
};

export default ManagePatients;
