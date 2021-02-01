import React from "react";
import { FlexBetweenContainer } from "../../../Components/reusable-css-in-js-components";
import formatDate from "../../../utils/formatDate";

export default function PatientPreConsultationInfo({ preConsultation }) {
  return (
    <div>
      <h5>Preconsultation Details</h5>
      {preConsultation.map((preConsultationDet, index) => (
        <div style={{ display:  index > 0 ? "none" : "block"}} className="show-elem-print">
          <FlexBetweenContainer>
            <PatientVitals preConsultationDet={preConsultationDet} />
            <PreConsultationDate date={preConsultationDet.date} />
          </FlexBetweenContainer>
          <PatientBMI preConsultationDet={preConsultationDet} />
        </div>
      ))}
    </div>
  );
}

const PatientVitals = ({ preConsultationDet }) => {
  return (
    <div>
      <div className="py-2">
        <div className="font-weight-bolder pb-3">Patient Vitals</div>
        <div className="mb-2">
          <span className="font-weight-bold">Blood Pressure</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.bloodPressure}mmHg</span>{" "}
        </div>

        <div className="mb-2">
          <span className="font-weight-bold">Respiration</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.respiration}BPM</span>{" "}
        </div>

        <div className="mb-2">
          <span className="font-weight-bold">Pulse</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.pulse}BPM</span>{" "}
        </div>

        <div className="mb-2">
          <span className="font-weight-bold">SPO2</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.SPO2}%</span>{" "}
        </div>

        <div className="mb-2">
          <span className="font-weight-bold">Temperature</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.temperature}°C</span>{" "}
        </div>
      </div>
    </div>
  );
};

const PatientBMI = ({ preConsultationDet }) => {
  return (
    <div>
      <div className="py-2">
        <div className="font-weight-bolder pb-3">Patient BMI</div>
        <div>
          <span className="font-weight-bold">Weight</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.weight}kg</span>{" "}
        </div>

        <div>
          <span className="font-weight-bold">Height</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.height}m</span>{" "}
        </div>

        <div>
          <span className="font-weight-bold">BMI</span>
          <span className="mx-1"> = </span>
          <span>{preConsultationDet?.calculatedBMI}kg/m</span>{" "}
        </div>
      </div>
    </div>
  );
};

const PreConsultationDate = ({ date }) => {
  return (
    <div className="py-2">
      <span className="font-weight-bold">Date captured</span>
      <span className="mx-1"> = </span>
      <span>{formatDate(date)}</span>
    </div>
  );
};
