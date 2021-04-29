import React from "react";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";

const PrescriptionInvoice = ({
  costingDetails,
  doctor,
  patient,
  generateInvoice,
}) => {
  const totalPrice = costingDetails.reduce(
    (amount, newAmount) => amount + newAmount.amountToBePaidByPatient,
    0
  );
console.log(costingDetails,"tdtdy");
  const userInsurance =
    costingDetails[0]?.amountTotal -
    costingDetails[0]?.amountToBePaidByPatient;
  return (
    <div
      className="modal fade"
      id="showInvoice"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header"></div>
          <div className="modal-body p-0">
          <div className="bg-light p-5">
            <div className="container">
            <div className="row align-items-baseline">
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
                  <h3>Invoice</h3>
                  <h6 className="mb-0">Invoice number:</h6>
                  <p>12345668</p>
                  <h6 className="mb-0">Date: </h6>
                  <p className="">{formatDate(Date.now())}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row py-4 px-5">
              <div className="col-6">
                <h6 className="mb-0">Bill to:</h6>
                <p className="mb-0">{`${patient?.firstName} ${patient?.lastName}`}</p>
                <p className="mb-0">957 North Street</p>
                <p className="mb-0">Enugu</p>
                <p>Nigeria</p>
              </div>
              <div className="col-6">
                <h6 className="mb-0">Bill from:</h6>
                <p className="mb-0">Hospitals Name</p>
                <p className="mb-0">957 South Street</p>
                <p className="mb-0">Enugu</p>
                <p>Nigeria</p>
              </div>
            </div>
          </div>
          <div className="bg-light">
            <div className="container">
              <div className="row px-5">
                <div className="col-6">
                  <h6 className="my-3">Item</h6>
                </div>

                <div className="col-2">
                  <h6 className="my-3">Cost</h6>
                </div>
                <div className="col-2">
                  <h6 className="my-3">QTY</h6>
                </div>
                <div className="col-2 px-0 text-right">
                  <h6 className="my-3 px-0">Price Paid</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-5 py-4">
            {costingDetails?.map((detail, index) => (
              <div key={index}>
                <div className="row">
                  <div className="col-6">
                    <h6 className="my-2">{detail?.drugName}</h6>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <p>&#8358; {detail?.priceTotal}</p>
                      </div>
                      <div className="col-6">
                        <p>
                          {" "}
                          {`${Number(detail?.numberOfUnits) ?? 0} packs, `}{" "}
                          {`${
                            Number(detail?.numberOfContainers) ?? 0
                          }  tablets, `}
                          {`${Number(detail?.numberOfCartons) ?? 0}  cartons`}
                        </p>
                      </div>
                      <div className="col-3">
                        <p className="text-right">
                          &#8358; {detail.amountToBePaidByPatient}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container">
            <div className="row px-5">
              <div className="col-6"></div>
              <div className="col-6">
                <div className="row">
                  <span className="border border-4 border-dark mb-2 w-100"></span>
                  <div className="col-6">
                    <p>Subtotal</p>
                  </div>
                  <div className="col-6 text-right">
                    <p>&#8358; {formatAmount(costingDetails[0]?.amountTotal)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>Insurance discount</p>
                  </div>
                  <div className="col-6 text-right">
                    <p>&#8358; - {userInsurance}</p>
                  </div>
                  <span className="border border-4 border-dark m-2 w-100"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-5">
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <p>Invoice Total</p>
                  </div>
                  <div className="col-6 text-right">
                    {formatAmount(totalPrice)} NGN
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
          <div className="modal-footer bg-white">
            <div className="actions ">
              <button
                type="button"
                className="btn text-light btn-primary"
                onClick={generateInvoice}
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { PrescriptionInvoice };
