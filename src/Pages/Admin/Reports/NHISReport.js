import React, { useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getPatientsUrl } from "../../../api/URLs";
import { Table } from "../../../Components";

const NHISReport = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getPatients = getPatientsUrl();
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data?.patients.map(
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
            <h4 className="page-title">NHIS Reports</h4>
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

export default NHISReport;
