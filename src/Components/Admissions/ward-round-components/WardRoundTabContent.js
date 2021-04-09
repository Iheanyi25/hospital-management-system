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

const WardRoundTabContent = ({ admissionId }) => {
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
            <DoctorsNotes admissionId={admissionId} />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Medications admissionId={admissionId} admissionInvoiceId={data?.admissionInvoice.id} />
          </div>
          <div
            className="tab-pane fade"
            id="pills-serviceMed"
            role="tabpanel"
            aria-labelledby="pills-serviceMed-tab"
          >
            <ServiceMedications admissionId={admissionId} />
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <div className="row justify-content-center mt-5">
              <div className="col-md-8">
                <div className="card border-light m-auto">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>Observation Chart</h4>
                      <button
                        className="btn btn-primary"
                        to="#"
                        data-toggle="modal"
                        data-target="#update-observation"
                      >
                        Update Observation
                      </button>
                    </div>

                    <ObservationCharts admissionId={admissionId} />
                  </div>
                </div>
              </div>
            </div>
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
