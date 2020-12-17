import React from "react";
// import {  } from "";

const PrescriptionInvoice = ()=>{
    return(
        <div
        className="modal fade"
        id="showInvoice"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <section>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"></h5>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-3">
                        <h6 className="m-0">Patient Name</h6>
                        <p className="m-0">Vitalis Ogbonna</p>
                    </div>
                    <div className="col-3">
                        <p className="m-0">email@email.com</p>
                        <p className="m-0">(124)58608688</p>
                    </div>
                    <div className="col-3">
                        <p className="m-0">123 Designer Ave</p>
                        <p className="m-0">Toronto, ON POSTAL Cananda</p>
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
                <div className="container">
                  <h4>Prescription Invoice</h4>
                </div>

                <div className="container">
                  <div className="row">
                      <div className="col-3">
                          <p className="m-0">Invoice no:</p>
                          <p className="m-0">1000-20-ABC</p>
                      </div>
                      <div className="col-3">
                          <p className="m-0" >Date issued</p>
                          <p className="m-0">Jan 11, 2020</p>
                      </div>
                    <div className="col-3">
                        <p className="m-0">Doctor in-charge</p>
                        <p className="m-0">Dr Thor Odison</p>
                    </div>
                    <div className="col-3">
                        <p className="m-0">123 Fake St</p>
                        <p className="m-0">kilometer 7, Enugu</p>
                    </div>
                  </div>
                </div>
                <hr/>
                {/* <div> */}
                    <div className="container">
                    <div className="row">
                        <p className="col-5 m-0">Atesunate</p>
                        <p className="col-4 m-0">2 packets</p>
                        <p className="col-2 m-0">&#8358; 5,000</p>
                    {/* </div> */}
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="col-5 m-0">Paracetamol 50mg</p>
                        <p className="col-4 m-0">5 packets, 5 pills</p>
                        <p className="col-3 m-0">&#8358; 5, 000</p>
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="col-5 m-0">Lonat</p>
                        <p className="col-4 m-0">1 packet</p>
                        <p className="col-3 m-0">&#8358; 500</p>
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="col-5 m-0">Panadol extra</p>
                        <p className="col-4 m-0">1 packets</p>
                        <p className="col-3 m-0">&#8358; 400</p>
                    </div>
                    <hr/>
                    <div className="row">
                        <small className=" col-5 m-0"> </small>
                        <small className=" col-4 m-0">Subtotal </small>
                        <small className="col-3 m-0">&#8358; 12,000</small>
                    </div>
                    <div className="row">
                        <small className="col-5 m-0" ></small>
                        <small className="col-4 m-0">Tax</small>
                        <small className="col-3 m-0">&#8358; 0.00</small>
                    </div>
                    <div className="row">
                        <small className="col-5 m-0"> </small>
                        <small  className="col-4 m-0">Total</small>
                        <small  className="col-3 m-0">&#8358; 12,000</small>
                    </div>
                </div>
              </div>
              <div className="modal-footer bg-white">                 
                <div className="actions ">
                  <button type="submit" className="btn text-light btn-primary">
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    );
};

export default PrescriptionInvoice;