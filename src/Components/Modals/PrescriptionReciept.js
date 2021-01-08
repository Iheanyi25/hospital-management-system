import React from "react";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";

const $ = window.$;

const PrescriptionReciept = ({ recieptDetails }) => {
  const patient = recieptDetails[0]?.clerking.patient;
  const doctor = recieptDetails[0]?.clerking?.doctor;
  console.log(patient, "doctor");
  console.log(recieptDetails, "costingDetails");

  const totalPrice = recieptDetails.reduce(
    (amount, newAmount) => amount + newAmount.priceTotal,
    0
  );

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
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <h6 className="m-0">Patient Name</h6>
                  <p className="m-0">{`${patient?.firstName} ${patient?.lastName}`}</p>
                </div>
                <div className="col-3">
                  <p className="m-0">{patient?.email}</p>
                  <p className="m-0">{patient?.phoneNumber ?? "N/A"}</p>
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
              {recieptDetails?.map((detail, index) => (
                <div key={index}>
                  <div className="row">
                    <p className="col-5 m-0">{detail?.drug.name}</p>
                    <p className="col-4 m-0">
                      {Number(detail?.numberOfUnits) === 1
                        ? `${detail.numberOfUnits} tablet * `
                        : Number(detail?.numberOfUnits) > 1
                        ? `${detail.numberOfUnits} tablets * `
                        : null}
                      {Number(detail?.numberOfContainers) === 1
                        ? `${detail.numberOfContainers} pack * `
                        : Number(detail?.numberOfContainers) > 1
                        ? `${detail.numberOfContainers} packs * `
                        : null}
                      {Number(detail?.numberOfCartons) === 1
                        ? `${detail.numberOfCartons} carton * `
                        : Number(detail?.numberOfCartons) > 1
                        ? `${detail.numberOfCartons} cartons * `
                        : null}{" "}
                    </p>
                    <p className="col-2 m-0">&#8358; {detail?.priceTotal}</p>
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
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PrescriptionReciept };
