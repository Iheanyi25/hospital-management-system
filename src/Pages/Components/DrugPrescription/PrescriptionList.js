import React from "react";
import PatientAndAdminImage from "../../../assets/img/PatientAndAdminIcon.svg";

const PrescriptionList = ({ prescription }) => {
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
          <h6 className="mt-2 ml-2">{`${
            prescription?.patient?.firstName ?? ""
          } ${prescription?.patient?.lastName ?? ""}`}</h6>
        </div>
        <p className="mb-0">{prescription?.prescription}</p>
      </div>
    </div>
  );
};

export { PrescriptionList };
