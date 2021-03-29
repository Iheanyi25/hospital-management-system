import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import { ClarkingHistory } from "../../Components/Clarking";
import { useHistory, useParams } from "react-router";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import WardRoundTabHeader from "./ward-round-components/WardRoundTabHeader";
import WardRoundTabContent from "./ward-round-components/WardRoundTabContent";
import { DischargePatients } from "../Modals/DischargePatients";

const WardRoundNotes = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const { id: admissionId } = useParams();
  const {
    location: {
      state: {
        patient,
        patient: { firstName, lastName, id },
        appointmentOrConsultationId,
      },
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
            {/* <p></p> */}
            <div>
              <Link
                className="btn btn-outline-primary"
                to="#"
                data-toggle="modal"
                data-target="#discharge-patient"
              >Discharge Patient</Link>
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
            </div>          
          </header>
          <div className="card border-light w-50 my-5 mx-auto">
            <ClarkingHistory
              patientDetails={{ firstName, lastName, id }}
              appointmentOrConsultationId={appointmentOrConsultationId}
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
                    <WardRoundTabHeader />
                  </div>
                  <WardRoundTabContent admissionId={admissionId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DischargePatients/>
    </>
  );
});

export default WardRoundNotes;
