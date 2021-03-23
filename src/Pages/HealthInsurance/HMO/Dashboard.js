import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { PageLoader, Table } from "../../../Components";
import { Link } from "react-router-dom";
import ActionButton from "../../../Components/DataTable/ActionButton";
import {
  HMODashboardHeader,
  HMODashboardSummary,
} from "./hmo-dashboard-components";

const Dashboard = observer(() => {
  const data = {
    plans: [
      { type: "Mark" },
      { type: "Jacob" },
      { type: "Larry" },
      { type: "Jacob" },
      { type: "Mark" },
    ],
  };
  let dataTable = [];
  if (data) {
    dataTable = data.plans.map(({ type }, index) => {
      return {
        "#": ++index,
        "NHIS Types": type,
        Actions: <DashboardActionTable />,
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
          <div className="page-content">
            <HMODashboardSummary
              userCount="N/A"
              planCount="N/A"
              userGroupCount="N/A"
            />
            <HMODashboardHeader />
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
});
const DashboardActionTable = () => {
  return (
    <ActionButton>
      <Link to={`/AdminManageNHISPatients`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Manage patients
      </Link>
      <Link to={`/AdminManageNHISDrugs`} className="btn btn-sm btn-block">
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

export default Dashboard;
