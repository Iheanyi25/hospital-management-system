import React, { Fragment } from "react";
import {
  FlexBetweenContainer,
  HorizontalLine,
} from "../../../Components/reusable-css-in-js-components";
import PatientClerkingInfo from "./PatientClerkingInfo";
import PatientPreConsultationInfo from "./PatientPreConsultationInfo";
import {
  PatientBioDetails,
  PatientHealthDetails,
  PatientContactDetails,
} from "./PatientProfileInfo";


export default function PatientHealthHistoryBody({ patientDet }) {
  const { profile, clerking, preConsultation } = patientDet;

  return (
    <Fragment>
        <PatientBioDetails profile={profile} />
        <HorizontalLine />
        <PatientHealthDetails profile={profile} />
        <HorizontalLine />
        <PatientContactDetails profile={profile} />
        <HorizontalLine lineWidth="80%" />
        <FlexBetweenContainer width="100%">
          <PatientPreConsultationInfo preConsultation={preConsultation} />
          <PatientClerkingInfo clerking={clerking}/>
        </FlexBetweenContainer>
    </Fragment>
  );
}
