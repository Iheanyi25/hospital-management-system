import React, { useEffect } from "react";

const InvalidDetails = ({ setErrorStatus }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorStatus();
    }, 3000);
  });

  return (
    <div className="alert alert-warning with-after-icon" role="alert">
      <div className="alert-content">Invalid log in details!</div>
      <div className="alert-icon">
        <i className="icofont-alarm"></i>
      </div>
    </div>
  );
};

export { InvalidDetails };
