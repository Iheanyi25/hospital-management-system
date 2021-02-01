import React from "react";
import { FlexBetweenContainer } from "../../../Components/reusable-css-in-js-components";
import formatDate from "../../../utils/formatDate";

export default function PatientClerkingInfo({ clerking }) {

  return (
    <div style={{ width: "55%" }}>
      <h5>Clerking</h5>
     
        {clerking.map((clerking, index) => (
          <div style={{ display:  index > 0 ? "none" : "block"}} className="show-elem-print">
               <FlexBetweenContainer>
            <PatientClerkingDetail clerkingDet={clerking} />
            <PreClerkingDate date={clerking.dateOfClerking} />
            </FlexBetweenContainer>
          </div>
        ))}
      
    </div>
  );
}

const PatientClerkingDetail = ({ clerkingDet }) => {
  return (
    <div>
      <div className="py-2">
        <div className="pb-3">
          <span className="font-weight-bold">Clerked By</span>
          <div  className="py-2">Dr. {clerkingDet?.doctorName}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Presenting complains</span>
          <div className="py-2">{clerkingDet?.presentingComplaints}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">History of complains</span>
          <div className="py-2">{clerkingDet?.historyOfPresentingComplaints}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Review of system</span>
          <div className="py-2">{clerkingDet?.reviewOfSystem}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Diagnosis</span>
          <div className="py-2">{clerkingDet?.diagnosis}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Treatment plan</span>
          <div className="py-2">{clerkingDet?.treatmentPlan}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Obstetrics & Gynecology</span>
          <div className="py-2">{clerkingDet?.obstetricsAndGynecology}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Prescription</span>
          <div className="py-2">{clerkingDet?.prescription}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Physical Examination</span>
          <div className="py-2">{clerkingDet?.physicalExamination}</div>{" "}
        </div>

        <div className="py-2">
          <span className="font-weight-bold">Last Country Visited</span>
          <div className="py-2">{clerkingDet?.lastCountryVisited}</div>{" "}
        </div>
      </div>
    </div>
  );
};

const PreClerkingDate = ({ date }) => {
  return (
    <div className="py-2">
      <span className="font-weight-bold">Date captured</span>
      <span className="mx-1"> = </span>
      <span>{formatDate(date)}</span>
    </div>
  );
};
