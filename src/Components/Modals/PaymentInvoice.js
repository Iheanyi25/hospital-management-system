import React, { useEffect, useState } from "react";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";
import { getServicesInAnInvoiceUrl } from "../../api/URLs";
import { useRequest } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";

const $ = window.$;
const PaymentReciept = () => {    

  return (
    <div
      className="modal fade"
      id="payment-invoice"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"></h5>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col">
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
                <div className="col">
                  <h5>Invoice</h5>
                  <p className="">Invoice number:</p>
                  <p></p>
                  <p>Date: </p>
                  <p className="">{formatDate(Date.now())}</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p className="">Bill to:</p>
                  <p>Patients Name</p>
                  <p>957 North Street</p>
                  <p className="">Enugu</p>
                  <p>Nigeria</p>
                </div>
                <div className="col">
                  <p className="">Bill from:</p>
                  <p>Hospitals Name</p>
                  <p>957 South Street</p>
                  <p className="">Enugu</p>
                  <p>Nigeria</p>
                </div>
              </div>
              <div className="row">
                  <div className="col">
                      <p>Item</p>
                  </div>
                  <div className="col">
                      <p>Cost</p>
                      <p>QTY</p>
                      <p>Price Paid</p>
                  </div>
              </div>
              <div className="col">
                  <p>Athesunate</p>
                  <p>paracetamol</p>
              </div>
              <div className="col">
                  <div className="row">
                      <div className="col">
                        <p>&#8358; 99</p>
                        <p>&#8358; 220</p>
                      </div>
                      <div className="col">
                          <p>1</p>
                          <p>2</p>
                      </div>
                      <div className="col">
                        <p>&#8358; 99</p>
                        <p>&#8358; 22</p>
                      </div>
                  </div>
                  <hr/>
                    <div className="row">
                        <div className="col-6">
                            <p>Subtotal</p>
                            <p>VAT</p>
                        </div>
                            <p>HMO discount</p>
                        <div className="col-6">
                            <p>&#8358; 99</p>
                            <p>&#8358; 220</p>
                            <p>&#8358; 220</p>                        
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                           <p>Invoice Total</p> 
                        </div>
                        <div className="col-6">
                            <p>&#8358; 120 NGN</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Payments method</p>
                    <p>&#8358; 220 payment from POS</p>
                    <button className="btn text-light btn-primary">Generate Invoice</button>
                </div>
                <span className="">Need help? <a href="">help@laviemedic.com</a></span>
            </div>

            {/* <div className="container">
              <div className="row">
                <div className="col-3">
                  <p className="m-0">Date issued</p>
                  <p className="m-0">{formatDate(Date.now())}</p>
                </div>
                <div className="col-3">
                  <p className="m-0">Doctor in-charge</p>
                  <p className="m-0">{`Dr ${doctor?.firstName} ${doctor?.lastName}`}</p>
                </div>
                <div className="col-3">
                  <p className="m-0">123 Fake St</p>
                  <p className="m-0">kilometer 7, Enugu</p>
                </div>
              </div>
            </div>
            <hr />
            {/* <div> 
            <div className="container">
              {costingDetails?.map((detail, index) => (
                <div key={index}>
                  <div className="row">
                    <p className="col-5 m-0">{detail?.drug?.name}</p>
                    <p className="col-4 m-0">
                      {" "}
                      {`${Number(detail?.numberOfUnits) ?? 0} packs, `}{" "}
                      {`${Number(detail?.numberOfContainers) ?? 0}  tablets, `}
                      {`${Number(detail?.numberOfCartons) ?? 0}  cartons`}
                    </p>
                    <p className="col-2 m-0">&#8358; {detail?.priceTotal}</p>
                    {/* </div> *
                  </div>
                  <hr />
                </div>
              ))}
              <div className="row">
                <small className=" col-5 m-0"> </small>
                <small className=" col-4 m-0">Subtotal </small>
                <small className="col-3 m-0">
                  &#8358;{formatAmount(totalPrice)}
                </small>
              </div>
              <div className="row">
                <small className="col-5 m-0"></small>
                <small className="col-4 m-0">Tax</small>
                <small className="col-3 m-0">&#8358; 0.00</small>
              </div>
              <div className="row">
                <small className="col-5 m-0"> </small>
                <p className="col-4 m-0">Total</p>
                <p className="col-3 m-0"> &#8358; {formatAmount(totalPrice)}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-white">
            <div className="actions ">
              <button type="button" className="btn text-light btn-primary">
                Print
              </button>
            </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PaymentReciept };
