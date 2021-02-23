import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getAdmissionsUrl } from "../../api/URLs";
import incomplete from "../../assets/img/incomplete.svg";
import paid from "../../assets/img/paid.svg";
import { Table } from "../DataTable";
import ActionButton from "../DataTable/ActionButton";
import { PageLoader } from "../Loader";
import AdmissionsSummary from "./manage-admissions-components/AdmissionsSummary";

const ManageAdmissions = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getAdmissions = getAdmissionsUrl(pageNumber, pageSize);
  const getAdmissionsConfig = fetchConfig({
    url: getAdmissions,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionsConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  let dataTable = [];
  if (data) {
    dataTable = data.admissions.map((admission, index) => {
      return {
        "#": ++index,
        "Patient Name": `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
        "Doctor Name": `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
        Ward: admission?.bed?.ward?.name,
        Room: admission?.bed?.name,
        Status:
          admission?.bed === null ? (
            <>
              <img src={incomplete} alt="not paid" /> Pending
            </>
          ) : (
            <>
              <img src={paid} alt="paid" /> Admitted
            </>
          ),
        Actions: <AdmissionsActionTable />,
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
            <h4 className="page-title">Admissions</h4>
          </header>
          <div className="page-content">
            <AdmissionsSummary />
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

const AdmissionsActionTable = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Hello, Nothing
      </Link>
    </ActionButton>
  );
};

export default ManageAdmissions;
