import React from "react";
import formatAmount from "../../utils/formatAmount";
import ReceiptHeader from "../../Pages/Admin/RecieptHeader";

const PrescriptionReciept = ({ costingDetails, isFetchingDrugs }) => {
  const totalPrice = costingDetails.reduce(
    (amount, newAmount) => amount + newAmount.amountToBePaidByPatient,
    0
  );

  return (
    <div>
      {isFetchingDrugs ? (
        <Loader />
      ) : (
        <>
          <ReceiptHeader
            invoiceNumber={
              costingDetails[0]?.drugDispensingInvoice?.invoiceNumber
            }
          />
          <PrescriptionReceiptBody
            totalPrice={totalPrice}
            costingDetails={costingDetails}
          />
        </>
      )}
    </div>
  );
};

export { PrescriptionReciept };

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const PrescriptionReceiptBody = ({ totalPrice, costingDetails }) => {
  console.log(costingDetails, 22223);
  const patient = costingDetails[0]?.drugDispensingInvoice?.clerking?.patient;
  const userInsurance =
    costingDetails[0]?.drugDispensingInvoice?.amountTotal -
    costingDetails[0]?.drugDispensingInvoice?.amountToBePaidByPatient;
  return (
    <div>
      <div className="modal-body p-0">
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
                  <h6 className="my-2">{detail?.drug?.name}</h6>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-3">
                      <p>&#8358; {detail?.totalPrice}</p>
                    </div>
                    <div className="col-6">
                      <p>
                        {" "}
                        {`${Number(detail?.numberOfUnits) ?? 0} tablets, `}{" "}
                        {`${Number(detail?.numberOfContainers) ?? 0}  packs, `}
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
                  <p>
                    &#8358;{" "}
                    {formatAmount(
                      costingDetails[0]?.drugDispensingInvoice.amountTotal
                    )}
                  </p>
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
            <p className="mb-0">Payment method</p>
            <p>
              &#8358;{" "}
              {` ${formatAmount(totalPrice)} payment by ${
                costingDetails[0]?.drugDispensingInvoice.paymentMethod
              }`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
