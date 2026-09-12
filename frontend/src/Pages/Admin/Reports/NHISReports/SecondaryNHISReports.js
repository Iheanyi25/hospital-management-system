import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getPatientSecondaryNHISServicesUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";

const SecondaryNHISReports = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getPatients = getPatientSecondaryNHISServicesUrl(pageNumber, pageSize);
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data?.healthPlanPatients.map(
      (
        {
          patient: { firstName, lastName, email, phoneNumber, patientId: id },
          service: {
            name,
            serviceCategory: { name: categoryName },
          },
          authorizationCode,
        },
        index
      ) => {
        console.log(id, 344);
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}`,
          Email: <a href={"mailto:" + email}>{email}</a>,
          Phone: phoneNumber || "Not available",
          "Authorization Code": authorizationCode,
          "Service Category": (
            <span style={{ textTransform: "capitalize" }}>
              {categoryName || "Not available"}
            </span>
          ),
          Service: (
            <span style={{ textTransform: "capitalize" }}>
              {name || "Not available"}
            </span>
          ),
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
            <h4 className="page-title">Secondary NHIS Report</h4>
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

export default SecondaryNHISReports;
