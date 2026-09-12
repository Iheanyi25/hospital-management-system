import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getNHISHealthPlanPatientsUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";

const PrimaryNHISReports = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getPatients = getNHISHealthPlanPatientsUrl(pageNumber, pageSize);
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data?.healthPlanPatients.map(
      ({ firstName, lastName, email, phoneNumber, patientId: id }, index) => {
        console.log(id, 344);
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}`,
          Email: <a href={"mailto:" + email}>{email}</a>,
          Phone: phoneNumber || "Not available",
        };
      }
    );
  }
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Primary NHIS Report</h4>
          </header>
          <div className="page-content">
            {data && (
              <Table
                exportAction
                content={dataTable}
                paginationDetails={data?.paginationDetails}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PrimaryNHISReports;
