import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import {
  getHMOsUrl,
  getPatientsUrl,
  getPatientInvoicesForHMOUrl,
} from "../../../../api/URLs";
import { formatInputDate } from "../../../../utils/formatInputDate";
import { isNotEmptyString } from "../../../../utils/validationUtils";
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
  const getHMOs = getHMOsUrl(1, 200);
  const getHMOsConfig = fetchConfig({
    url: getHMOs,
    method: "get",
  });
  const { data: hmoObject } = useRequest(getHMOsConfig, {
    revalidateOnFocus: false,
  });
  let hmOOptions = [];
  if (hmoObject?.hmOs.length > 0) {
    hmoObject.hmOs.forEach(({ id, name }) => {
      hmOOptions.push({ value: id, label: name });
    });
    // console.log(hmoOptions, 4545);
  }
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
    console.log(data);
    console.log(details);
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
              <h3 className="page-title">Payment for drug report</h3>
            </header>
            <p className="ml-3">
              Select the date range to see the data from that timeline
            </p>
            <FetchReportForm
              startDate={startDate}
              endDate={endDate}
              hmo={hmo}
              hmOOptions={hmOOptions}
              handleHMOChange={handleHMOChange}
              patient={patient}
              patientOptions={patientOptions}
              handlePatientChange={handlePatientChange}
              handleChange={handleChange}
              fetchReport={fetchReport}
            />
            <div className="col col-md-12">
              <PatientInvoiceTabHeader />
              <PatientInvoiceTabContent reports={reports} />
              {/* <div>
                {reports.length === 0 ? (
                  <div className="card border-light m-auto w-50 p-4">
                    <NoDataState />
                  </div>
                ) : (
                  <div className="page-content">
                    <Table content={dataTable} exportAction />
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatientInvoiceReport;

const FetchReportForm = ({
  startDate,
  endDate,
  handleChange,
  fetchReport,
  hmo,
  hmOOptions,
  handleHMOChange,
  patient,
  patientOptions,
  handlePatientChange,
}) => {
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(startDate) && isNotEmptyString(endDate)) {
      setEmptyField(false);
    }
  }, [startDate, endDate]);
  return (
    <div className="card border-light p-4">
      <form className="mb-4" onSubmit={fetchReport}>
        <div className="row">
          <div className="col-12 col-sm-2">
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

          <div className="col-12 col-sm-2">
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
              <Select
                value={hmo}
                isSearchable={true}
                options={hmOOptions}
                onChange={handleHMOChange}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-12 col-sm-3">
            <div className="form-group">
              <label>Payment method (optional)</label>
              <Select
                value={patient}
                isSearchable={true}
                options={patientOptions}
                onChange={handlePatientChange}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-12 col-sm-2">
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
  );
};
