import React from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManageUserSubGroups = () => {
  const {
    location: { state: userGroupName },
  } = useHistory();
  const { id } = useParams();
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
        "Sub Groups": user,
        Actions: <ActionTable />,
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
            <h4 className="page-title mb-0">
              {`Manage User Sub Group in ${userGroupName}`}
            </h4>
            <div>
              <div className="col"></div>
              <div className="col text-right">
                <Link
                  to={{pathname:`/CreateUserSubGroup/${id}`, state: userGroupName}}
                  className="btn btn-outline-primary mr-2 mb-2"
                >
                  Create Sub Group
                </Link>
              </div>
            </div>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.patients.length : 0}
              heading="Total User Groups"
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
const ActionTable = () => {
  return (
    <ActionButton>
      <Link to={`/AddUserGroupToPlan`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Assign to health plan
      </Link>
      <Link to={`/ManagePatientsInSubGroup`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Manage Patients
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

export default ManageUserSubGroups;
