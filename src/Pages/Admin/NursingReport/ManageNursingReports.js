import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import {
  getNurseReportsUrl,
  getNurseReportsByNurseUrl,
} from "../../../api/URLs";
import { CreateNursingReport, PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { UserContext } from "../../../mobx/UserState";
import formatDate from "../../../utils/formatDate";
import formatTme from "../../../utils/formatTime";

const ManageNursingReports = () => {
  const {
    user: { userType, id },
  } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getNurseReports =
    userType === "Nurse"
      ? getNurseReportsByNurseUrl(id, pageNumber, pageSize)
      : getNurseReportsUrl(pageNumber, pageSize);
  const getNurseReportsConfig = fetchConfig({
    url: getNurseReports,
    method: "get",
  });
  const { data, error } = useRequest(getNurseReportsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data?.report.map(
      ({ firstName, lastName, shift, dateOfShift, timeOfShift }, index) => {
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}` ?? "N/A",
          Shift: shift ?? "N/A",
          Date: formatDate(dateOfShift) ?? "N/A",
          Time: formatTme(timeOfShift) ?? "N/A",
          Action: <ActionTable />,
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
            <h4 className="page-title mb-0">Nursing Reports</h4>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#create-nursing-report"
            >
              Create a Report
            </button>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data?.report.length : 0}
              heading="Number of Nurse Reports"
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
      <CreateNursingReport />
    </Fragment>
  );
};

const ActionTable = () => {
  return (
    <ActionButton>
      <Link
        to={{ pathname: `/AdminUpdateNursingReport` }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Update Report
      </Link>
    </ActionButton>
  );
};

export default ManageNursingReports;
