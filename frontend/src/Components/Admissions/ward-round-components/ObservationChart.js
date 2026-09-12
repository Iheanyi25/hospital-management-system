import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import user from "../../../assets/img/user.png";
import { getObservationChartUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import { UpdateObservationChart } from "../../Modals";

let $ = window.$;
$.DataTables = require("datatables.net");

const ObservationCharts = ({ admissionId, dischargeStatus }) => {
  const getObservationChart = getObservationChartUrl(admissionId);
  const getObservationChartConfig = fetchConfig({
    url: getObservationChart,
    method: "get",
  });
  const { data, mutate } = useRequest(getObservationChartConfig, {
    revalidateOnFocus: false,
  });
  console.log(dischargeStatus, 1230923190);
  return (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card border-light m-auto">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Observation Chart</h4>
                {dischargeStatus ? null : (
                  <button
                    className="btn btn-primary"
                    to="#"
                    data-toggle="modal"
                    data-target="#update-observation"
                  >
                    Update Observation
                  </button>
                )}
              </div>

              <div className="card-body">
                <div id="accordion" className="mb-3">
                  {data?.patientObservationChart?.map((observation, index) => (
                    <div className="card mb-0">
                      <div className="card-header" id={`heading${index}`}>
                        <h5 className="mb-0">
                          <button
                            className="btn btn-outline-primary btn-block"
                            data-toggle="collapse"
                            data-target={`#collapseDrNote${index}`}
                            aria-expanded="true"
                            aria-controls={`collapse${index}`}
                          >
                            Observation Chart
                            {` Captured on ${
                              formatDate(observation.date) ?? ""
                            }`}
                          </button>
                        </h5>
                      </div>
                      <div
                        id={`collapseDrNote${index}`}
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
                                {/* {" "} */}
                                {`${observation?.initiator?.firstName} ${observation?.initiator?.lastName}`}
                              </u>
                            </h5>
                            <p className="mb-2">
                              {" "}
                              {`Clerked patient on ${
                                formatDate(observation?.date) ?? ""
                              }`}
                            </p>
                          </div>
                        </div>
                        <div className="card-body w-50">
                          <div className="pl-5">
                            <h6 className="font-weight-bold">Patient Vitals</h6>

                            <div className="border-bottom pb-3">
                              <p className="mb-0">Blood pressure</p>
                              <small className="text-info">
                                {observation?.bloodPressure}
                                25
                              </small>
                            </div>
                            <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Respiration</p>
                              <small className="text-info">
                                {observation?.respiration}
                              </small>
                            </div>
                            <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Pulse</p>
                              <small className="text-info">
                                {observation?.pulse}
                                2.5
                              </small>
                            </div>
                            <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">SPO2</p>
                              <small className="text-info">
                                {observation?.spO2}
                              </small>
                            </div>
                            <div className="border-bottom pb-3">
                              <p className="mb-0 mt-2">Tempreture (celsius)</p>
                              <small className="text-info">
                                {observation?.temperature}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) ?? null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateObservationChart admissionId={admissionId} mutate={mutate} />
    </>
  );
};

export { ObservationCharts };
