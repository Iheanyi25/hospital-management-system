import React, { useState } from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getSubGroupPatientsBySubGroupUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManagePatients = () => {
  const {
    location: { state: subGroupName },
  } = useHistory();
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getSubGroupPatientsBySubGroup = getSubGroupPatientsBySubGroupUrl(
    id,
    pageNumber,
    pageSize
  );
  const getSubGroupPatientsBySubGroupConfig = fetchConfig({
    url: getSubGroupPatientsBySubGroup,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getSubGroupPatientsBySubGroupConfig,
    {
      revalidateOnFocus: false,
    }
  );
  let dataTable = [];
  if (data) {
    dataTable = data.patients.map(
      ({ patient: { firstName, lastName, email, phoneNumber }, id }, index) => {
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}`,
          Email: <a href={"mailto:" + email}>{email}</a>,
          Phone: phoneNumber || "Not available",
          Actions: <PatientActionTable />,
        };
      }
    );
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
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">{`Manage Patients in ${subGroupName}`}</h4>
            <Link
              className="btn btn-primary"
              to={{ pathname: `/AddUserToSubGroup/${id}`, state: subGroupName }}
            >
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
                paginationDetails={data.paginationDetails}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
const PatientActionTable = () => {
  return (
    <ActionButton>
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
