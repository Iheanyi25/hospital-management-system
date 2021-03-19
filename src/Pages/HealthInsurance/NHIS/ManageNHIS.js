import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManageNHIS = () => {
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
        Actions: <NHISActionTable />,
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
            <h4 className="page-title mb-0">NHIS Health Plans</h4>
            <Link className="btn btn-primary" to="/AdminCreateNHIS">
              Create government NHIS plan
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.plans.length : 0}
              heading="Number of NHIS Plans"
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
const NHISActionTable = () => {
  return (
    <ActionButton>
      <Link
        to={`/AdminManageNHISPatients`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage patient
      </Link>
      <Link
        to={`/AdminManageNHISPatients`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage drug
      </Link>
    </ActionButton>
  );
};

export default ManageNHIS;
