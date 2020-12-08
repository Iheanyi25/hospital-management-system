import React from "react";

const UpdateInventory = () => {
  return (
    <div
      className="modal fade"
      id="update-inventory"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{`Update`}</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Amount</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="name"
                />
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">
                  Update Drug
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpdateInventory };