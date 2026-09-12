import React from "react";
import { Table } from "../../../../../Components";
import NoDataState from "../../../../../Components/EmptyState/NoDataState";
import formatDate from "../../../../../utils/formatDate";
const PatientInvoiceTabContent = ({ reports }) => {
  const { drugInvoices, serviceInvoices } = reports;
  let invoiceTable = [];
  let serviceTable = [];
  if (drugInvoices) {
    invoiceTable = drugInvoices?.map(
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
  if (serviceInvoices) {
    serviceTable = serviceInvoices?.map(
      (
        {
          service: { name },
          serviceInvoice: {
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
          "Service Name": name,
          "Invoice Number": invoiceNumber,
          "Amount (NGN)": amountToBePaidByHMO,
          "Date Generated": formatDate(dateGenerated),
        };
      }
    );
  }
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          {drugInvoices.length === 0 ? (
            <div className="card border-light m-auto w-50 p-4">
              <NoDataState />
            </div>
          ) : (
            <div className="page-content">
              <Table
                content={invoiceTable}
                tableID={"drugInvoices" + drugInvoices.length}
                key={"drugInvoices" + drugInvoices.length}
                exportAction
              />
            </div>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          {serviceInvoices.length === 0 ? (
            <div className="card border-light m-auto w-50 p-4">
              <NoDataState />
            </div>
          ) : (
            <div className="page-content">
              <Table
                content={serviceTable}
                tableID={"serviceInvoices" + serviceInvoices.length}
                key={"serviceInvoices" + serviceInvoices.length}
                exportAction
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { PatientInvoiceTabContent };
