import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getAdmissionInvoiceUrl } from "../../../api/URLs";
import {
  DrugsInInvoice,
  ServiceRequestsInInvoice,
} from "../admission-invoices-components";
import DoctorsNotes from "./DoctorsNotes";
import Medications from "./DrugMedications";
// import Medications from "./Medications";
import ServiceMedications from "./ServiceMedications";
import { ObservationCharts } from "./ObservationChart";

const WardRoundTabContent = ({ admissionId, dischargeStatus }) => {
  // get admission invoice
  const invoicesUrl = getAdmissionInvoiceUrl(admissionId);
  const getAdmissionInvoiceConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionInvoiceConfig, {
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <DoctorsNotes
              admissionId={admissionId}
              dischargeStatus={dischargeStatus}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Medications
              admissionId={admissionId}
              admissionInvoiceId={data?.admissionInvoice.id}
              dischargeStatus={dischargeStatus}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-serviceMed"
            role="tabpanel"
            aria-labelledby="pills-serviceMed-tab"
          >
            <ServiceMedications
              admissionId={admissionId}
              admissionInvoiceId={data?.admissionInvoice.id}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <ObservationCharts admissionId={admissionId} />
          </div>
          <div
            className="tab-pane fade"
            id="pills-drug"
            role="tabpanel"
            aria-labelledby="pills-drug-tab"
          >
            <DrugsInInvoice admissionInvoiceId={data?.admissionInvoice.id} />
          </div>
          <div
            className="tab-pane fade"
            id="pills-services"
            role="tabpanel"
            aria-labelledby="pills-services-tab"
          >
            <ServiceRequestsInInvoice
              admissionInvoiceId={data?.admissionInvoice.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardRoundTabContent;
