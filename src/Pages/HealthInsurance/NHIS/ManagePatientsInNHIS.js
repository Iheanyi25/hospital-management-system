import React, { Fragment, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getNHISHealthPlanPatientsByHealthPlanUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManagePatients = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHealthPlanPatientsByHealthPlan = getNHISHealthPlanPatientsByHealthPlanUrl(
    id,
    pageNumber,
    pageSize
  );
  const getHealthPlanPatientsByHealthPlanConfig = fetchConfig({
    url: getHealthPlanPatientsByHealthPlan,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getHealthPlanPatientsByHealthPlanConfig,
    {
      revalidateOnFocus: false,
    }
  );
  let dataTable = [];
  if (data) {
    dataTable = data.healthPlanPatients.map(
      ({ patient: { firstName, lastName, email, phoneNumber } }, index) => {
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}`,
          Email: <a href={"mailto:" + email}>{email}</a>,
          Phone: phoneNumber || "Not available",
          Actions: <NHISPatientActionTable />,
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
            <h4 className="page-title mb-0">{`Manage Patients in ${healthPlanName}`}</h4>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/AdminAddUserToNHIS/${id}`,
                state: healthPlanName,
              }}
            >
              Add patient
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.healthPlanPatients.length : 0}
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
const NHISPatientActionTable = () => {
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
