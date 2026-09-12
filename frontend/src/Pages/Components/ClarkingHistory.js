import React from "react";
import { ClarkingHistory } from "../../Components/Clarking";

const ClarkingHist = (props) => {
  const { id, firstName, lastName } = props.location.state;

  return (
    <main className="main-content">
      <div className="app-loader">
        <i className="icofont-spinner-alt-4 rotate" />
      </div>
      <div className="main-content-wrap">
        <div className="row justify-content-center mt-5 w-75 mx-auto">
          <div className="col-md-12">
            <div className="card border-light">
              <ClarkingHistory patientDetails={{ id, firstName, lastName }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClarkingHist;
