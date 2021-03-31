import React from "react";

// const $ = window.$;

const DisplayNotes = ({ details }) => {
  const { title, body } = details;
  return (
    <div
      className="modal fade"
      id="notes"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{title}</h5>
            <span>{body}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DisplayNotes };
