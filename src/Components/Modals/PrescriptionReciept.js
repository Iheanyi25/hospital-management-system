import React, { useEffect, useState, useRef } from "react";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";
import {useReactToPrint} from 'react-to-print'
import ReceiptHeader from "../../Pages/Admin/RecieptHeader";

const $ = window.$;

const PrescriptionReciept = ({ costingDetails }) => {
  const componentRef = useRef();

  //Function to print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(costingDetails, "costingDetails");

  const totalPrice = costingDetails.reduce(
    (amount, newAmount) => amount + newAmount.priceTotal,
    0
  );
  const doctor = costingDetails[0]?.clerking?.doctor;
  const patient = costingDetails[0]?.clerking?.patient;

  return (
    <div
      className="modal fade"
      id="view-reciept"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      {/* <div className="modal fade"> */}
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"></h5>
          </div>
          <ComponentToPrint patient={patient} doctor={doctor} costingDetails={costingDetails} totalPrice={totalPrice} ref={componentRef}/>
          <div className="modal-footer bg-white">
            <div className="actions ">
              <button type="button" className="btn text-light btn-primary" onClick={handlePrint}>
                Print
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};


class ComponentToPrint extends React.PureComponent{
  constructor(props){
    super(props);
  }
  render(){
      let {patient, doctor, costingDetails, totalPrice} = this.props
    return(
<div className="modal-body">
            <ReceiptHeader/>
            <div className="container">
              <h4>Reciept</h4>
            </div>

            <div className="container">
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
            {/* <div> */}
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
                    {/* </div> */}
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
    )
  }
}

export { PrescriptionReciept };
