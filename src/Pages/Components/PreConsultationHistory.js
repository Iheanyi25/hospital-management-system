import React from "react";
import { PreConsultationHistory } from "../../Components/Clarking";

const PreConsultationHist = (props) => {
  const { id, firstName, lastName } = props.location.state;

  return (
    <div className="row justify-content-center mt-5 w-75 mx-auto">
      <div className="col-md-12">
        <div className="card border-light">
          <PreConsultationHistory
            patientDetails={{ id, firstName, lastName }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreConsultationHist;
