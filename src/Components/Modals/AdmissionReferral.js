import React from "react";

function AdmissionReferral() {
  return (
    <>
      <div
        className="modal fade"
        id="admission-referral"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow-lg">
              <h5 className="text-center">Please enter admission note</h5>
              <form className="">
                <div className="form-group">
                  <textarea
                    name="admission notes"
                    placeholder="Enter admission notes"
                    classname="form-control text-muted"
                    id=""
                    cols="50"
                    rows="6"
                  ></textarea>
                  <div className="row mx-auto my-4">
                    {/* <div className="col"> */}
                    <button
                      className="btn col-3 mr-2 btn-outline-danger"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <div className="col-3"></div>
                    <button type="submit" className="btn btn-primary col-5 px-5 ml-3">
                      Send to admission
                    </button>
                  </div>
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdmissionReferral;
