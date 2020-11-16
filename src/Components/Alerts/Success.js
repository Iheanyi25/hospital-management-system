import React, { useState, useEffect } from "react";

const Success = ({ message, history, nextRoute, dontRoute }) => {
  const [view, setView] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setView(false);
    }, 2000);
    if (!dontRoute) {
      return () => {
        history.push(`${nextRoute}`);
      };
    }
  }, [nextRoute, history, view]);

  return view ? (
    <div className="alert alert-success alert-align" role="alert">
      <h3 className="text-light">Success!</h3>
      <h6 className="text-light">{message}</h6>
    </div>
  ) : null;
};

export { Success };
