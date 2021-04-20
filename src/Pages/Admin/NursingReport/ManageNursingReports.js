import React, { Fragment } from "react";
import { PageLoader, Table } from "../../../Components";
import TableSize from "../../../Components/DataTable/TableSize";

const ManageNursingReports = () => {
  const data = {
    reports: [{ name: "Hello", shift: "Hi" }],
  };
  let dataTable = [];
  if (data) {
    dataTable = data?.reports.map(({ name, shift }, index) => {
      return {
        "#": ++index,
        Name: name,
        Shift: shift,
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
            <h4 className="page-title mb-0">Nursing Repports</h4>
            <button className="btn btn-primary">
              Create a Report
            </button>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data?.reports.length : 0}
              heading="Number of HMO Accounts"
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

export default ManageNursingReports;
