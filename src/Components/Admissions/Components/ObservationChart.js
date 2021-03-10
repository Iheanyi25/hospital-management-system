import React from "react";
// import { fetchConfig } from "../../api/fetchConfig";
// import { useRequest } from "../../api/fetcher";
import user from "../../../assets/img/user.png";
// import { getAdmissionsDoctorsNotesUrl } from "../../api/URLs";
import formatDate from "../../../utils/formatDate"
// ../utils/formatDate";
// import { PageLoader } from "../Loader";
// import NoDataState from "../EmptyState/NoDataState";

let $ = window.$;
$.DataTables = require("datatables.net");

const ObservationCharts = () => {
//   const getAdmissionsDoctorsNotes = getAdmissionsDoctorsNotesUrl(id);
//   const getAdmissionsDoctorsNotesConfig = fetchConfig({
//     url: getAdmissionsDoctorsNotes,
//     method: "get",
//   });
//   const { data, error } = useRequest(getAdmissionsDoctorsNotesConfig);
//   console.log(data);
  const Charts = {
    notes: [
      { date: 3029, note: "cefujkec", doctorsName: "Kaduna" },
      { date: 3029, note: "cefujkec", doctorsName: "Kaduna" },
      { date: 3029, note: "cefujkec", doctorsName: "Kaduna" },
    ],
  };
  
  return (
    <>
      <div className="card-body">
        {/* {this.props.user ? null : (
            <h4 className="text-center mb-4">{`${{firstName: "Iheanyi"}} ${{lastName: "iheanyi"}}`}</h4>
          )} */}
        <div id="accordion" className="mb-3">
          {/* {loading ? (
              <PageLoader />
            ) 
            : patientPreConsultations.length === 0 ?
             (
              <NoDataState />
            ) : (
             patientPreConsultations.map((patientPreConsultation, index) => ( */}
            { Charts.notes?.map((Chart) =>(
                
            // ))
// }
          <div className="card mb-0">
            <div className="card-header" id={`heading${1}`}>
              <h5 className="mb-0">
                <button
                  className="btn btn-outline-primary btn-block"
                  data-toggle="collapse"
                  data-target={`#collapseDrNote${1}`}
                  aria-expanded="true"
                  aria-controls={`collapse${1}`}
                >
                  Observation Chart
                  {`Captured on ${
                          formatDate(Chart.date) ?? ""
                        }`}
                </button>
              </h5>
            </div>
            <div
              id={`collapseDrNote${1}`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="d-flex mt-3 mb-3">
                <img
                  src={user}
                  style={{ height: "64px", width: "64px" }}
                  className="rounded-circle mr-3"
                  alt="user"
                />
                <div>
                  <h5 className="mb-2 mt-1 font-weight-bold">
                    <u>
                      {" "}
                      Dr Tahah Halli
                      {`Dr. ${Chart.name
                        //   clerkingHistory?.consultation?.doctor?.firstName ??
                        //   clerkingHistory?.doctor?.firstName ??
                        //   ""
                        // } ${
                        //   clerkingHistory?.consultation?.doctor?.lastName ??
                        //   clerkingHistory?.doctor?.lastName ??
                        //   ""
                        }`}
                    </u>
                  </h5>
                  <p className="mb-2">
                    {" "}
                    {`Clerked patient on ${
                        formatDate(Chart?.date) ?? ""
                      }`}
                  </p>
                </div>
              </div>
              <div className="card-body w-50">
                <div className="pl-5">
                  <h6 className="font-weight-bold">Patient Vitals</h6>

                  {/* <div className="border-bottom pb-3">
                      <p className="mb-0">Blood pressure</p>
                      <small className="text-info">
                        {/* {patientPreConsultation?.bloodPressure} 
                        25
                      </small>
                    </div>
                    <div className="border-bottom pb-3">
                      <p className="mb-0 mt-2">Respiration</p>
                      <small className="text-info">
                        {/* {patientPreConsultation?.respiration}
                      </small>
                    </div>
                    <div className="border-bottom pb-3">
                      <p className="mb-0 mt-2">Pulse</p>
                      <small className="text-info">
                        {/* {patientPreConsultation?.pulse}
                        2.5
                      </small>
                    </div>
                    <div className="border-bottom pb-3">
                      <p className="mb-0 mt-2">SPO2</p>
                      <small className="text-info">
                        {/* {patientPreConsultation?.spO2}
                        khcvd
                      </small>
                    </div>
                    <div className="border-bottom pb-3">
                      <p className="mb-0 mt-2">Tempreture (celcius)</p>
                      <small className="text-info">
                        hello
                        {/* {patientPreConsultation?.temperature} 
                      </small>
                    </div>
                  </div>
                  <div className="pl-5 mt-4">
                    <h6 className="font-weight-bold">Patient BMI</h6>
                    <div className="border-bottom pb-3">
                      <p className="mb-0">Weight (kg)</p>
                      <small className="text-info">
                        {/* {patientPreConsultation?.weight}
                        53kg
                      </small>
                    </div>
                    <div className="border-bottom pb-3">
                      <p className="mb-0 mt-2">Height (m)</p>
                      <small className="text-info">
                        {" "}
                        165
                        {/* {patientPreConsultation?.height}
                      </small>
                    </div>
                    <div className="border-bottom pb-3">
                      <p className="mb-0 mt-2">Calculated BMI</p>
                      <small className="text-info">
                        {/* {patientPreConsultation?.calculatedBMI} 
                        25
                      </small>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
          )) ?? null
            }
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export { ObservationCharts };
