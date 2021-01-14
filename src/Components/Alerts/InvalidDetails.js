import React, { useEffect } from "react";

const InvalidDetails = ({ setErrorStatus, message }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorStatus();
    }, 3000);
  });

  return (
    <div className="d-flex justify-content-center" style={{ width: "100vw" }}>
      <div className="alert alert-warning with-after-icon " role="alert">
        <div className="alert-content">{`${message}!`}</div>
        <div className="alert-icon">
          <i className="icofont-alarm"></i>
        </div>
      </div>
    </div>
  );
};

export { InvalidDetails };
