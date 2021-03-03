import React from "react";
import { DrugsInInvoice } from "./DrugsInInvoice";
import { ServiceRequestsInInvoice } from "./ServiceRequestsInInvoice";

const AdmissionTabContent = ({ admissionInvoiceId }) => {
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-active"
          role="tabpanel"
          aria-labelledby="pills-active-tab"
        >
          <DrugsInInvoice admissionInvoiceId={admissionInvoiceId} />
        </div>

        <div
          className="tab-pane fade"
          id="pills-accepted"
          role="tabpanel"
          aria-labelledby="pills-accepted-tab"
        >
          <ServiceRequestsInInvoice admissionInvoiceId={admissionInvoiceId} />
        </div>

        <div
          className="tab-pane fade"
          id="pills-completed"
          role="tabpanel"
          aria-labelledby="pills-completed-tab"
        >
          history
        </div>
      </div>
    </div>
  );
};

export { AdmissionTabContent };
