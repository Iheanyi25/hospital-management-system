import React, { useState, useEffect } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { getReportsForExpiryDatesOfDrugsUrl } from "../../../api/URLs";
import { Table } from "../../../Components";
import NoDataState from "../../../Components/EmptyState/NoDataState";
import { formatInputDate } from "../../../utils/formatInputDate";
import { isNotEmptyString } from "../../../utils/validationUtils";

const ExpiredDrugsReport = () => {
  const [date, setDate] = useState("");
  const [reports, setReports] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(date)) {
      setEmptyField(false);
    }
  }, [date]);

  const fetchReport = async (e) => {
    e.preventDefault();
    const getTransactionsUrl = getReportsForExpiryDatesOfDrugsUrl(
      date + "T23:59:59.000Z"
    );
    const getTransactionsForRegistrationConfig = fetchConfig({
      url: getTransactionsUrl,
      method: "post",
    });
    const { data } = await fetchWrapper(getTransactionsForRegistrationConfig);
    setReports(data?.expiredDrugs);
    console.log(data);
  };
  console.log(reports);
  let dataTable = [];
  if (reports) {
    dataTable = reports?.map((report, index) => {
      return {
        "#": ++index,
        "Drug name": (
          <span style={{ textTransform: "capitalize" }}>{report?.name}</span>
        ),
        "Generic Name": (
          <span style={{ textTransform: "capitalize" }}>
            {report?.genericName}
          </span>
        ),
        Type: (
          <span style={{ textTransform: "capitalize" }}>
            {report?.drugType}
          </span>
        ),
        Manufacturer: (
          <span style={{ textTransform: "capitalize" }}>
            {report?.manufacturer}
          </span>
        ),
        "Quantity in stock": (
          <span style={{ textTransform: "capitalize" }}>
            {report?.quantityInStock}
          </span>
        ),
      };
    });
  }

  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <header className="page-header ml-3">
              <h3 className="page-title"> Drug expiry date report</h3>
            </header>
            <p className="ml-3">
              Select the date range to see the data from that timeline
            </p>
            <div className="col col-md-12">
              <div className="card border-light p-4">
                <form className="mb-4" onSubmit={fetchReport}>
                  <div className="row">
                    <div className="col-12 col-sm-8">
                      <div className="form-group">
                        <label>
                          Expiry Date<small className="text-danger">*</small>
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          tabIndex={-98}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          name="date"
                          max={formatInputDate()}
                          placeholder="Start Date"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group mt-4 text-center">
                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          disabled={emptyField ? true : false}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                {reports.length === 0 ? (
                  <div className="card border-light m-auto w-50 p-4">
                    <NoDataState />
                  </div>
                ) : (
                  <div className="page-content">
                    <Table content={dataTable} exportAction />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExpiredDrugsReport;
