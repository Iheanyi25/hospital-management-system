import React from "react";
import PatientAndAdminImage from "../../../assets/img/PatientAndAdminIcon.svg";

const PrescriptionList = ({ fullName, prescription }) => {
  return (
    <div className="card bg-light">
      <div className="card-body p-5 m-auto">
        <div className="d-flex">
          <img
            src={PatientAndAdminImage}
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "50%",
            }}
            alt="user"
          />
          <h6 className="mt-2 ml-2">{fullName}</h6>
        </div>
        <p className="mb-0">{prescription}</p>
      </div>
    </div>
  );
};

export { PrescriptionList };
