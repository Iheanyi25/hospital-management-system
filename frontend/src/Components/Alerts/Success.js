import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Success = ({ message, nextRoute, state, isError, callback, timeOut }) => {
  const [view, setView] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
    if(mounted) setView(false);
      if (callback) {
        callback();
      }

      if (nextRoute) {
        history.push({
          pathname: `${nextRoute}`,
          state: state
        });
      }
    }, timeOut || 2000);
    return () => {
			mounted = false;
		};
  }, [nextRoute, history, view, callback, state, timeOut]);

  return view ? (
    <div className={`alert alert-align ${ !isError ?  "alert-success" : "alert-danger"}`} role="alert">
      <h2 className="text-light">{ !isError ? "Success!" : "Failed"}</h2>
      <h6 className="text-light">{message}</h6>
    </div>
  ) : null;
};

export { Success };