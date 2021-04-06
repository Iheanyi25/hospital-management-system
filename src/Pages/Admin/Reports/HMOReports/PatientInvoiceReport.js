import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import {
  getPatientsUrl,
  getPatientInvoicesForHMOUrl,
} from "../../../../api/URLs";
import { FetchReportForm } from "./components";
import {
  PatientInvoiceTabContent,
  PatientInvoiceTabHeader,
} from "./patient-invoice-components";

const PatientInvoiceReport = () => {
  const [details, setDetails] = useState({
    startDate: "",
    endDate: "",
  });
  const [reports, setReports] = useState({
    drugInvoices: [],
    serviceInvoices: [],
  });
  const [hmo, setHmo] = useState();
  const [patient, setPatient] = useState();
  const getPatients = getPatientsUrl(1, 200);
  const getPatientsConfig = fetchConfig({
    url: getPatients,
    method: "get",
  });
  const { data } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });
  let patientOptions = [{ value: "all", label: "All" }];
  if (data?.patients.length > 0) {
    data.patients.forEach(({ patientId: id, firstName, lastName }) => {
      patientOptions.push({ value: id, label: `${firstName} ${lastName}` });
    });
  }
  const handlePatientChange = (patient) => {
    setPatient(patient);
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
      patientId: patient.value,
    };
    const getPatientInvoicesForHMO = getPatientInvoicesForHMOUrl();
    const getPatientInvoicesForHMOConfig = fetchConfig({
      url: getPatientInvoicesForHMO,
      method: "post",
      data: payload,
    });
    const { data } = await fetchWrapper(getPatientInvoicesForHMOConfig);
    setReports({
      drugInvoices: data?.patientInvoices.drugInvoices,
      serviceInvoices: data?.patientInvoices.serviceInvoices,
    });
  };
  const { startDate, endDate } = details;

  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <header className="page-header ml-3">
              <h3 className="page-title">HMO Patient Report</h3>
            </header>
            <p className="ml-3">
              Select the date range to see the data from that timeline
            </p>
            <FetchReportForm
              startDate={startDate}
              endDate={endDate}
              hmo={hmo}
              handleHMOChange={handleHMOChange}
              optionValue={patient}
              optionTitle="Select Patient"
              options={patientOptions}
              handleOptionChange={handlePatientChange}
              handleChange={handleChange}
              fetchReport={fetchReport}
            />
            <div className="col col-md-12">
              <PatientInvoiceTabHeader />
              <PatientInvoiceTabContent reports={reports} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatientInvoiceReport;
