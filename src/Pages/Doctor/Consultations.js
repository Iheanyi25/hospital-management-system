import React, { useContext } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getDoctorAllConsultationsUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import {
  ConsultationSummary,
  ConsultationTabContent,
  ConsultationTabHeader,
} from "./consultation-components";

const Consultations = ({doctorId}) => {
  const {
    user: { id },
  } = useContext(UserContext);

  //if there is props called doctorId, it means its coming from admin
  const getDoctorAllConsultations = getDoctorAllConsultationsUrl(doctorId || id);
  const getDoctorAllConsultationsConfig = fetchConfig({
    url: getDoctorAllConsultations,
    method: "get",
  });
  const { data, error } = useRequest(getDoctorAllConsultationsConfig, {
    revalidateOnFocus: false,
  });

  const patientsWaitingForDoctor = [];
  const patientsAttendedTo = [];
  const rejectedPatients = [];

  if (data) {
    console.log(data, 999);
    data.doctorConsultations.forEach((consultation) => {
      console.log(consultation, 8888);
      if (consultation.patientQueue.isCompleted) {
        patientsAttendedTo.push(consultation);
      } else if (consultation.patientQueue.isCanceled) {
        rejectedPatients.push(consultation);
      } else if (
        !consultation.patientQueue.isCompleted &&
        !consultation.patientQueue.isExpired &&
        !consultation.patientQueue.isCanceled
      ) {
        patientsWaitingForDoctor.push(consultation);
      }
    });
  }

  if (error) return <div>failed to load</div>;
  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <ConsultationSummary
            patientsWaitingForDoctorCount={patientsWaitingForDoctor.length}
            patientsAttendedToCOunt={patientsAttendedTo.length}
            rejectedPatientsCount={rejectedPatients.length}
          />

          <header className="page-header">
            <h4 className="page-title">My Consultation List</h4>
          </header>
          <div className="page-content">
            <div className="card-body"></div>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <ConsultationTabHeader />
                  {data && (
                    <ConsultationTabContent
                      patientsWaiting={patientsWaitingForDoctor}
                      patientsAttendedTo={patientsAttendedTo}
                      // patientConsultationsCancelled={rejectedPatients}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Consultations);
