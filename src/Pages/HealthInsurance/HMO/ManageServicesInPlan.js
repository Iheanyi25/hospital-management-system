import React from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManageServices = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id } = useParams();
  const data = {
    services: [
      { name: "Mark", category: "Liquid" },
      { name: "Jacob", category: "Liquid" },
      { name: "Larry", category: "Liquid" },
      { name: "Jacob", category: "Liquid" },
      { name: "Mark", category: "Liquid" },
    ],
  };
  let dataTable = [];
  if (data) {
    dataTable = data.services.map(({ name, category }, index) => {
      return {
        "#": ++index,
        "Service Category": category,
        "Service Name": name,
        Actions: <NHISServicesActionTable />,
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
            <h4 className="page-title mb-0">{`Manage Services in ${healthPlanName}`}</h4>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/AddServiceToPlan/${id}`,
                state: healthPlanName,
              }}
            >
              Add service
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.services.length : 0}
              heading="Total No of Services"
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
const NHISServicesActionTable = () => {
  return (
    <ActionButton>
      <button className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </button>
    </ActionButton>
  );
};

export default ManageServices;
