import { React } from "react";
// import {  } from "";

const PrescriptionInvoice = ()=>{
    return(
        <div
        className="modal fade"
        id="add-drug"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <section>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"></h5>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-3">
                        <h6>Patient Name</h6>
                        <p>Vitalis Ogbonna</p>
                    </div>
                    <div className="col-3">
                        <p>email@email.com</p>
                        <p>(124)58608688</p>
                    </div>
                    <div className="col-3">
                        <p>123 Designer Ave</p>
                        <p>Toronto, ON POSTAL Cananda</p>
                    </div>
                    <div className="logo-wrap">
                        <img
                        src="../../assets/img/logo.svg"
                        width={147}
                        height={33}
                        className="logo-img"
                        alt="Hello"
                        />
                    </div>
                  </div>
                </div>
                <div className="">
                  <h4>Prescription Invoice</h4>
                </div>

                <div className="container">
                  <div className="row">
                      <div className="col-3">
                          <p>Invoice no:</p>
                          <p>1000-20-ABC</p>
                      </div>
                      <div className="col-3">
                          <p>Date issued</p>
                          <p>Jan 11, 2020</p>
                      </div>
                  </div>
                  <div className="col-3">
                      <p>Doctor in-charge</p>]
                      <p>Dr Thor Odison</p>
                  </div>
                  <div className="col-3">
                    <p>123 Fake St</p>
                    <p>Toronto, ON POSTAL Cananda</p>
                  </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <p>Athesunate</p>
                            <p>2 packets</p>
                            <p></p>
                        </div>
                    </div>
                </div>
              </div>
              <div className="modal-footer d-block">                 
                <div className="actions justify-content-between">
                  {/* <button
                    type="button"
                    className="btn btn-error"
                    data-dismiss="modal"
                    onClick={(e) => this.clearForm(e)}
                  >
                    Cancel
                  </button>{" "} */}
                  <button type="submit" className="btn btn-info">
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      /* end Add Drug modal */
    // </>
    );
};

export default PrescriptionInvoice;