import React, { useState, useEffect } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { getTransactionsForDrugsUrl } from "../../../api/URLs";
import { Table } from "../../../Components";
import NoDataState from "../../../Components/EmptyState/NoDataState";
import formatAmount from "../../../utils/formatAmount";
import { formatInputDate } from "../../../utils/formatInputDate";
import { isNotEmptyString } from "../../../utils/validationUtils";

const DrugReport = () => {
  const [details, setDetails] = useState({
    startDate: "",
    endDate: "",
    paymentMethod: "",
  });
  const [reports, setReports] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { startDate, endDate } = details;
    if (isNotEmptyString(startDate) && isNotEmptyString(endDate)) {
      setEmptyField(false);
    }
  }, [details]);
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const fetchReport = async (e) => {
    const { startDate, endDate, paymentMethod } = details;
    e.preventDefault();
    const payload = {
      startDate: startDate + "T00:00:00.000Z",
      endDate: endDate + "T23:59:59.000Z",
      paymentMethod,
    };
    const getTransactionsUrl = getTransactionsForDrugsUrl();
    const getTransactionsForRegistrationConfig = fetchConfig({
      url: getTransactionsUrl,
      method: "post",
      data: payload,
    });
    const { data } = await fetchWrapper(getTransactionsForRegistrationConfig);
    setReports(data?.drugTransactions);
    console.log(data);
    console.log(details);
  };
  const { startDate } = details;
  console.log(reports);
  let dataTable = [];
  if (reports) {
    dataTable = reports?.map((report, index) => {
      return {
        "#": ++index,
        Initiator: `${report?.initiator?.firstName} ${report?.initiator?.lastName}`,
        "Initiator Email": (
          <a href={"mailto:" + report?.initiator?.email}>
            {report?.initiator?.email}
          </a>
        ),
        Benefactor: `${report?.benefactor?.firstName ?? "Not"} ${report?.benefactor?.lastName ?? "Available"}`,
        "Amount (NGN)": formatAmount(report?.amount),
        "Transaction Type": report?.transactionType,
        "Payment Method": (
          <span style={{ textTransform: "capitalize" }}>
            {report?.paymentMethod}
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
              <h3 className="page-title">Payment for drug report</h3>
            </header>
            <p className="ml-3">
              Select the date range to see the data from that timeline
            </p>
            <div className="col col-md-12">
              <div className="card border-light p-4">
                <form className="mb-4" onSubmit={fetchReport}>
                  <div className="row">
                    <div className="col-12 col-sm-3">
                      <div className="form-group">
                        <label>
                          Start Date<small className="text-danger">*</small>
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          tabIndex={-98}
                          onChange={handleChange}
                          name="startDate"
                          max={formatInputDate()}
                          placeholder="Start Date"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-3">
                      <div className="form-group">
                        <label>
                          End Date<small className="text-danger">*</small>
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          tabIndex={-98}
                          min={startDate}
                          onChange={handleChange}
                          name="endDate"
                          max={formatInputDate()}
                          placeholder="End Date"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-3">
                      <div className="form-group">
                        <label>Payment method (optional)</label>
                        <select
                          className="form-control"
                          tabIndex={-98}
                          name="paymentMethod"
                          onChange={handleChange}
                        >
                          <option selected value="" disabled>
                            Select a payment method
                          </option>
                          <option value="">All</option>
                          <option value="cash">Cash</option>
                          <option value="pos">POS</option>
                          <option value="transfer">Transfer</option>
                          <option className="paystack">Paystack</option>
                          <option className="flutterwave">Flutterwave</option>
                          <option value="cheque">Cheque</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
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

export default DrugReport;
