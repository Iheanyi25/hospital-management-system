import React from "react";
import { Link } from "react-router-dom";

function AdmissionReferral() {
  const handleSubmit = (e)=> {
    e.preventDefault()
    alert("just clicked")
  }
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
            <div className="modal-body p-5 shadow-lg d-flex justify-content-center align-item-center">
              <div className="w-75 text-center">
              <h5 className="text-center">Please enter admission note</h5>
              {/* <Link to="/AdminDoctorsNotes" className="col-3">Wardround</Link> */}
              <form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <textarea
                    name="admission notes"
                    placeholder="Enter admission notes"
                    classname="form-control text-muted"
                    id=""
                    style={{width:"100%", height:"96px"}}
                  ></textarea>
                  <div className="row m-0 p-0">
                    {/* <div className="col"> */}
                    <button
                      className="btn col-3 mr-2 btn-outline-danger"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <Link to="/AdminWardRoundNotes" className="col-3">Wardround</Link>
                    <button type="submit" onSubmit={handleSubmit} className="btn btn-primary col-5 px-5 ml-3">
                      Send to admission
                    </button>
                  </div>
                </div>
              </form>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdmissionReferral;
