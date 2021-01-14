import React from "react";
import { PageLoader } from "../../Components";
import user from "../../assets/img/user.png";
import formatDate from "../../utils/formatDate";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { getPatientClarkingHistoryUrl } from "../../api/URLs";

let $ = window.$;
$.DataTables = require("datatables.net");
class ClarkingHistory extends React.Component {
  state = {
    clerkingHistories: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchClarkingHistories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reMount !== this.props.reMount) {
      this.fetchClarkingHistories();
    }
  }

  fetchClarkingHistories = async () => {
    const { id } = this.props.patientDetails;
    try {
      const getPatientClarkingHistory = getPatientClarkingHistoryUrl(id);
      const getPatientClarkingHistoryConfig = fetchConfig({
        url: getPatientClarkingHistory,
        method: "GET",
      });
      const { data, status } = await fetchWrapper(
        getPatientClarkingHistoryConfig
      );
      this.setState({
        clerkingHistories: data.clerkingHistory,
      });
      if (status === 200) {
        this.setState({ ...this.state, loading: false });
      }
      if (this.props.setCount)
        this.props.setCount(this.state.clerkingHistories.length);
    } catch (error) {
      // console.log(error);
      this.setState({ loading: false })
    }
  };

  render() {
    const { clerkingHistories, loading } = this.state;
    // console.log(clerkingHistories, "histories");
    const { firstName, lastName } = this.props.patientDetails;
    return (
      <div className="card-body">
        {this.props.user ? null : (
          <h4 className="text-center mb-4">{`${firstName} ${lastName}`}</h4>
        )}
        <div id="accordion" className="mb-3">
          {loading ? (
            <PageLoader />
          ) : clerkingHistories.length === 0 ? (
            <div className="d-flex justify-content-center my-4">
              <img
                src={require("../../assets/img/emptyData.svg")}
                alt="empty states"
              />
            </div>
          ) : (
                clerkingHistories.map((clerkingHistory, index) => (
                  <div className="card mb-0">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-outline-primary btn-block"
                          data-toggle="collapse"
                          data-target={`#collapse${index + 1}`}
                          aria-expanded="true"
                          aria-controls={`collapse${index + 1}`}
                        >
                          {`Captured on ${formatDate(clerkingHistory?.dateOfClerking) ?? ""
                            }`}
                        </button>
                      </h5>
                    </div>
                    <div
                      id={`collapse${index + 1}`}
                      className="collapse"
                      aria-labelledby="headingOne"
                    >
                      <div className="card-body">
                        <div className="d-flex mt-3 mb-3">
                          <img
                            src={user}
                            style={{ height: "64px", width: "64px" }}
                            className="rounded-circle mr-3"
                            alt="user"
                          />
                          <div>
                            <h5 className="mb-2 mt-1 font-weight-bold">
                              <u>{`Dr. ${clerkingHistory?.consultation?.doctor?.firstName ??
                                clerkingHistory?.doctor?.firstName ??
                                ""
                                } ${clerkingHistory?.consultation?.doctor?.lastName ??
                                clerkingHistory?.doctor?.lastName ??
                                ""
                                }`}</u>
                            </h5>
                            <p className="mb-2">
                              {`Clerked patient on ${formatDate(clerkingHistory?.dateOfClerking) ?? ""
                                }`}
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-block mb-4"
                          data-toggle="collapse"
                          data-target="#collapsePatientHistoryOne"
                        >
                          Patient health history
                    </button>
                        <div
                          id="collapsePatientHistoryOne"
                          className="collapse show"
                        >
                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Social history</h5>
                              <p>{clerkingHistory?.socialHistory ?? "N/A"}</p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Family history</h5>
                              <p>{clerkingHistory?.familyHistory ?? "N/A"}</p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Medical history</h5>
                              <p>{clerkingHistory?.medicalHistory ?? "N/A"}</p>
                            </div>
                            <div className="col col-md-6 mb-4">
                              <h5>Travel history</h5>
                              <p>
                                <b>Last country visited: </b>
                                {clerkingHistory?.lastCountryVisited ?? "N/A"}
                              </p>
                              <p>
                                <b>Date of visitation: </b>
                                {clerkingHistory?.dateOfVisitation ?? "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-block"
                          data-toggle="collapse"
                          data-target="#collapseClarking"
                        >
                          Clarking
                    </button>
                        <div id="collapseClarking" className="collapse">
                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Presenting complaints</h5>
                              <p>
                                {clerkingHistory?.presentingComplaints ?? "N/A"}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>History of complaints</h5>
                              <p>
                                {clerkingHistory?.historyOfPresentingComplaints ??
                                  "N/A"}
                              </p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Review of system</h5>
                              <p>{clerkingHistory?.reviewOfSystem ?? "N/A"}</p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Physical exam</h5>
                              <p>{clerkingHistory?.physicalExamination ?? "N/A"}</p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Diagnosis</h5>
                              <p>{clerkingHistory?.diagnosis ?? "N/A"}</p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Treatment plan</h5>
                              <p>{clerkingHistory?.treatmentPlan ?? "N/A"}</p>
                            </div>
                          </div>

                          <div className="row mx-0">
                            <div className="col col-md-6">
                              <h5>Obstetrics & Gynecology</h5>
                              <p>
                                {clerkingHistory?.obstetricsAndGynecology ?? "N/A"}
                              </p>
                            </div>
                            <div className="col col-md-6">
                              <h5>Priscriptions</h5>
                              <p>{clerkingHistory?.prescription ?? "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>
    );
  }
}

export { ClarkingHistory };
