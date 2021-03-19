import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { PageLoader, Table } from "../../../Components";
import { Link } from "react-router-dom";
import TableSize from "../../../Components/DataTable/TableSize";
import ActionButton from "../../../Components/DataTable/ActionButton";

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
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">HMO</h4>
            <div>
              <div className="col"></div>
              <div className="col text-right">
                <Link className="btn btn-outline-primary mr-2 mb-2">
                  Add user to HMO
                </Link>
                <Link
                  type="submit"
                  className="btn btn-outline-primary mr-2 mb-2"
                >
                  Create a user group
                </Link>
                <Link to="/CreateHealthPlan" type="submit" className="btn btn-primary mr-2 mb-2">
                  Create health plan
                </Link>
              </div>
            </div>
          </header>

          <div className="page-content">
            <div className="row">
              <TableSize
                size={data ? data.plans.length : 0}
                heading="Number of NHIS Plans"
              />
              <TableSize
                size={data ? data.plans.length : 0}
                heading="Total Users"
              />
              <TableSize
                size={data ? data.plans.length : 0}
                heading="Total Users Groups"
              />
            </div>
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
