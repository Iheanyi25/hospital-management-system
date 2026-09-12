import React, { useEffect } from "react";

const UnfilledForm = ({ setIncompleteFormFields }) => {
  useEffect(() => {
    setTimeout(() => {
      setIncompleteFormFields();
    }, 3000);
  });

  return (
    <div className="alert alert-warning with-after-icon" role="alert">
      <div className="alert-content">Please fill all form fields!</div>
      <div className="alert-icon">
        <i className="icofont-alarm"></i>
      </div>
    </div>
  );
};

export { UnfilledForm };
