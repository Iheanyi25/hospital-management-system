import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getNHISHealthPlansUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import formatAmount from "../../../utils/formatAmount";

const ManageNHIS = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getNHISHealthPlans = getNHISHealthPlansUrl(pageNumber, pageSize);
  const getNHISHealthPlansConfig = fetchConfig({
    url: getNHISHealthPlans,
    method: "get",
  });
  const { data, error } = useRequest(getNHISHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data.nhisHealthPlans.map(
      ({ name, percentage, amount, id }, index) => {
        return {
          "#": ++index,
          Name: name,
          Percentage: percentage,
          Amount: formatAmount(amount),
          Actions: <NHISActionTable healthPlanId={id} healthPlanName={name} />,
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
            <h4 className="page-title mb-0">NHIS Health Plans</h4>
            <Link className="btn btn-primary" to="/AdminCreateNHIS">
              Create NHIS Health Plan
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.nhisHealthPlans.length : 0}
              heading="Number of NHIS Plans"
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
const NHISActionTable = ({ healthPlanId, healthPlanName }) => {
  return (
    <ActionButton>
      <Link
        to={`/AdminManageNHISPatients/${healthPlanId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage patients
      </Link>
      <Link
        to={{ pathname: `/AdminManageNHISDrugs/${healthPlanId}`, state: healthPlanName }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage drugs
      </Link>
      <Link to={`/AdminManageNHISServices`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Manage services
      </Link>
    </ActionButton>
  );
};

export default ManageNHIS;
