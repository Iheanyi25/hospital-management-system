import React from "react";
import { useParams } from "react-router";
import { LabResults } from "../../Clarking";

const ViewServiceRequestResults = () => {
  const { id } = useParams();
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <div className="card border-light w-75 m-auto">
              <LabResults admissionServiceRequestId={id} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewServiceRequestResults;
