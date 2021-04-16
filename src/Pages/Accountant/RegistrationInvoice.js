import React from "react";
import { NavLink } from "react-router-dom";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import { fetchConfig } from "../../api/fetchConfig";
import { getRegistrationFeeInvoiceUrl } from "../../api/URLs";
import RegistrationInvoiceSummary from "./RegistrationInvoiceSummary";
import { useRequest } from "../../api/fetcher";
import { Table } from "../../Components";
import formatAmount from "../../utils/formatAmount";

const RegistrationInvoice = () => {
  const getRegistrationFeeInvoice = getRegistrationFeeInvoiceUrl();
  const getRegistrationFeeInvoiceConfig = fetchConfig({
    url: getRegistrationFeeInvoice,
    method: "get",
  });
  const { data, error } = useRequest(getRegistrationFeeInvoiceConfig, {
    revalidateOnFocus: false,
  });

  let dataTable = [];

  if (data) {
    dataTable = data.registrationInvoices.map((registrationInvoice, index) => {
      const { patient, paymentStatus } = registrationInvoice;
      return {
        "#": ++index,
        "Patient Name": `${patient.firstName} ${patient.lastName}`,
        Email: <a href={"mailto:" + patient.email}>{patient.email}</a>,
        Phone: patient.phoneNumber || "N/A",
        "Invoice Number": registrationInvoice?.invoiceNumber || "N/A",
        "Total Cost": formatAmount(registrationInvoice?.amount) || "N/A",
        Status:
          paymentStatus === "Not Paid" ? (
            <span>
              <img src={notpaid} alt="not paid" /> Not paid
            </span>
          ) : (
            <span>
              <img src={paid} alt="paid" /> Paid
            </span>
          ),
        Actions: (
          <RegistrationInvoiceAction
            registrationInvoice={registrationInvoice}
          />
        ),
      };
    });
  }

  if (error) return <div>failed to load</div>;
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Registration Invoices</h4>
          </header>
          <RegistrationInvoiceSummary
            registrationInvoices={data?.registrationInvoices || []}
          />
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                {data && <Table content={dataTable} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegistrationInvoice;

const RegistrationInvoiceAction = ({ registrationInvoice }) => {
  return registrationInvoice?.paymentStatus === "Not Paid" ? (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary btn-sm btn-block dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Action
      </button>
      <div className="dropdown-menu">
        <NavLink
          className="btn btn-sm btn-block"
          to={{
            pathname: `/AccountPatientRegistration/${registrationInvoice?.patient?.id}`,
            state: {
              patientId: registrationInvoice?.patient?.id,
              email: registrationInvoice?.patient?.email,
              cost: registrationInvoice.amount,
              name: `${registrationInvoice?.patient?.firstName} ${registrationInvoice?.patient?.lastName}`,
            },
          }}
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Pay Now
        </NavLink>
      </div>
    </div>
  ) : null;
};
