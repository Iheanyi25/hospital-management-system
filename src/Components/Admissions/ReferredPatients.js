import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getAdmissionsWithoutBedUrl } from "../../api/URLs";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";
import { Table } from "../DataTable";
import ActionButton from "../DataTable/ActionButton";
import TableSize from "../DataTable/TableSize";
import { PageLoader } from "../Loader";

const ReferredPatients = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getAdmissionsWithoutBed = getAdmissionsWithoutBedUrl(
    pageNumber,
    pageSize
  );
  const getAdmissionsWithoutBedConfig = fetchConfig({
    url: getAdmissionsWithoutBed,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionsWithoutBedConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data.admissions.map((admission, index) => {
      return {
        "#": ++index,
        "Patient Name": `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
        "Doctor Name": `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
        "Date of Admission": formatDate(admission.dateOfAdmission),
        Actions: <ReferredPatientsActionTable />,
      };
    });
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
            <h4 className="page-title">Referred Patients</h4>
          </header>
          <div className="page-content">
            <TableSize
              size={data ? formatAmount(data.admissions.length) : 0}
              heading="No of Patients Referred"
              icon=""
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

const ReferredPatientsActionTable = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Hello, Nothing
      </Link>
    </ActionButton>
  );
};

export default ReferredPatients;
