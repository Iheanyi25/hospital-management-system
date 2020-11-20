import React, { useState, useEffect } from "react";

const Success = ({ message, history, nextRoute, state, callback }) => {
  const [view, setView] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setView(false);
      if (callback) {
        callback();
      }

      if (nextRoute) {
        history.push({
          pathname: `${nextRoute}`,
          state: state
        });
      }
    }, 2000);

  }, [nextRoute, history, view]);

  return view ? (
    <div className="alert alert-success alert-align" role="alert">
      <h3 className="text-light">Success!</h3>
      <h6 className="text-light">{message}</h6>
    </div>
  ) : null;
};

export { Success };