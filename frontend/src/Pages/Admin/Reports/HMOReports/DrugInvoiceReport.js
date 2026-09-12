import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import { getDrugInvoicesForHMOUrl, getAllDrugsUrl } from "../../../../api/URLs";
import { Table } from "../../../../Components";
import NoDataState from "../../../../Components/EmptyState/NoDataState";
import formatDate from "../../../../utils/formatDate";
import { FetchReportForm } from "./components";

const DrugInvoiceReport = () => {
  const [details, setDetails] = useState({
    startDate: "",
    endDate: "",
  });
  const [reports, setReports] = useState([]);
  const [hmo, setHmo] = useState();
  const [drug, setDrug] = useState();
  const getDrugsUrl = getAllDrugsUrl(1, 200);
  const getDrugConfig = fetchConfig({
    url: getDrugsUrl,
    method: "get",
  });
  const { data } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });
  let options = [];
  if (data?.drugs.length > 0) {
    data.drugs.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }
  const handleDrugChange = (drug) => {
    setDrug(drug);
  };
  const handleHMOChange = (hmo) => {
    setHmo(hmo);
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const fetchReport = async (e) => {
    const { startDate, endDate } = details;
    e.preventDefault();
    const payload = {
      startDate: startDate + "T00:00:00.000Z",
      endDate: endDate + "T23:59:59.000Z",
      hmoId: hmo.value,
      drugId: drug.value,
    };
    const getDrugInvoicesForHMO = getDrugInvoicesForHMOUrl();
    const getDrugInvoicesForHMOConfig = fetchConfig({
      url: getDrugInvoicesForHMO,
      method: "post",
      data: payload,
    });
    const { data } = await fetchWrapper(getDrugInvoicesForHMOConfig);
    setReports(data?.drugInvoices);
  };
  const { startDate, endDate } = details;
  let dataTable = [];
  if (reports) {
    dataTable = reports?.map(
      (
        {
          drug: { name },
          drugDispensingInvoice: {
            patient: { firstName, lastName },
            invoiceNumber,
            amountToBePaidByHMO,
            dateGenerated,
          },
        },
        index
      ) => {
        return {
          "#": ++index,
          "Patient Name": `${firstName} ${lastName}`,
          "Drug Name": name,
          "Invoice Number": invoiceNumber,
          "Amount (NGN)": amountToBePaidByHMO,
          "Date Generated": formatDate(dateGenerated),
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
          <div className="page-content">
            <header className="page-header ml-3">
              <h3 className="page-title">HMO Drug Report</h3>
            </header>
            <p className="ml-3">
              Select the date range to see the data from that timeline
            </p>
            <FetchReportForm
              startDate={startDate}
              endDate={endDate}
              hmo={hmo}
              handleHMOChange={handleHMOChange}
              optionValue={drug}
              optionTitle="Select Drug"
              options={options}
              handleOptionChange={handleDrugChange}
              handleChange={handleChange}
              fetchReport={fetchReport}
            />
            <div className="col col-md-12">
              {reports.length === 0 ? (
                <div className="card border-light m-auto w-50 p-4">
                  <NoDataState />
                </div>
              ) : (
                <div className="page-content">
                  <Table
                    content={dataTable}
                    tableID={"reports" + reports.length}
                    key={"reports" + reports.length}
                    exportAction
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DrugInvoiceReport;
