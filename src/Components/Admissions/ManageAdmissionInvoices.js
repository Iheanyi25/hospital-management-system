import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { PageLoader } from "..";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getAdmissionInvoiceUrl } from "../../api/URLs";
import TableSize from "../DataTable/TableSize";
import {
  AdmissionTabContent,
  AdmissionTabHeader,
} from "./admission-invoices-components";

const ManageAdmissionInvoices = () => {
  const { id } = useParams();
  const invoicesUrl = getAdmissionInvoiceUrl(id);
  const getAdmissionInvoiceConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionInvoiceConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Admission Invoices</h4>
          </header>
          <div className="page-content">
            <div className="row">
              <TableSize size="23" heading="No. of Prescription Invoices" />
              <TableSize size="20" heading="No. of Service Request Invoices" />
            </div>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <AdmissionTabHeader />
                </div>
                {data && (
                  <AdmissionTabContent
                    admissionInvoiceId={data.admissionInvoice.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ManageAdmissionInvoices;
