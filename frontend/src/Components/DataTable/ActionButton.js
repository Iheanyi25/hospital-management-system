import React from "react";

export default function ActionButton(props) {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary btn-sm btn-block dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Action
      </button>
      <div className="dropdown-menu text-left">
        {props.children}
      </div>
    </div>
  );
}
