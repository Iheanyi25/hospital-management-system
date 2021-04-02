import React from "react";

// const $ = window.$;

const DisplayNotes = ({ details, id }) => {
  const { title, body } = details;
  return (
    <div
      className="modal fade"
      id={`notes-${id}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{title}</h5>
            <div className="p-5 text-center">
                <div className="text-center">{body}</div>
                <button
                  className="btn btn-outline-primary mt-3"
                  data-dismiss="modal"
                >
                  Close
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DisplayNotes };
