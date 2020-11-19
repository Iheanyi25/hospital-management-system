import React from "react";

const AddEducation = () => {
  return (
    <div
      className="modal fade"
      id="modal-10"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At esse,
            libero maxime officia sapiente veniam.
          </div>
          <div className="modal-footer">
            <div className="actions">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>{" "}
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddEducation };
