import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import { ClarkingHistory } from "../../Components/Clarking";
import DoctorsNotes from "./ward-round-components/DoctorsNotes";
import Medications from "./ward-round-components/Medications";
import { ObservationCharts } from "./ward-round-components/ObservationChart";
import { useHistory, useParams } from "react-router";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const WardRoundNotes = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const { id: admissionId } = useParams();
  const {
    location: {
      state: patient,
      state: { firstName, lastName, id },
    },
  } = useHistory();
  return (
    <>
      <PageLoader />

      <main className="main-content mt-2">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4
              className="page-title mb-0"
              style={{ textTransform: "capitalize" }}
            >{`${firstName} ${lastName}`}</h4>
            <Link
              className="btn btn-outline-primary"
              to={{
                pathname:
                  userType === "Admin"
                    ? `/AdminPatientProfile/${id}`
                    : userType === "Doctor"
                    ? `/DoctorPatientProfile/${id}`
                    : userType === "Nurse"
                    ? `/NursePatientProfile/${id}`
                    : "#",
                state: patient,
              }}
            >
              View patient profile
            </Link>
          </header>
          <div className="card border-light w-50 my-5 mx-auto">
            <ClarkingHistory
              patientDetails={{ firstName, lastName, id }}
              user
            />
          </div>
          <div className="page-content">
            <div className="row">
              <div className="tab-content col-md-12" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div>
                    <ul
                      className="nav nav-tabs mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="pills-home-tab"
                          data-toggle="pill"
                          href="#pills-home"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Doctors Notes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-profile-tab"
                          data-toggle="pill"
                          href="#pills-profile"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Medications
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-contact-tab"
                          data-toggle="pill"
                          href="#pills-contact"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          Observation Chart
                        </a>
                      </li>
                    </ul>
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
                        <Medications admissionId={admissionId} />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                      >
                        <div className="row justify-content-center mt-5">
                          <div className="col-md-12">
                            <div className="card border-light">
                              <div className="card-body">
                                <h4>Observation Chart</h4>
                                <ObservationCharts admissionId={admissionId} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

export default WardRoundNotes;
