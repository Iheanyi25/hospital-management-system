import React  from "react";

function ReceiptHeader({patient}){    
  return (
    <div>
      <div className="container pt-5">
        <div className="row">
          <div className="col-3">
            <h6 className="m-0">Patient Name</h6>
            <p className="m-0">{`${patient?.firstName} ${patient?.lastName}`}</p>
          </div>
          <div className="col-3">
            <p className="m-0">{patient?.email}</p>
            <p className="m-0">{patient?.phoneNumber ?? "N/A"}</p>
          </div>
          <div className="col-3">
            <p className="m-0">123 Designer Ave</p>
            <p className="m-0">Toronto, ON POSTAL Cananda</p>
          </div>
          <div className="logo-wrap">
            <img
              src="../../assets/img/logo.svg"
              width={147}
              height={33}
              className="logo-img"
              alt="Hello"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReceiptHeader
