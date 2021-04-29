import React from "react";
import formatAmount from "../../utils/formatAmount";
import ReceiptHeader from "../../Pages/Admin/RecieptHeader";

const ServiceReciept = ({ services, isFetchingServices }) => {
  console.log(isFetchingServices,4343);
  return (
    <div>
      {isFetchingServices ? (
        <Loader />
      ) : (
        <>
          <ReceiptHeader
            invoiceNumber={services[0]?.serviceInvoice?.invoiceNumber}
          />
          <ServiceInvoiceBody service={services} />
        </>
      )}
    </div>
  );
};

export { ServiceReciept };

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const ServiceInvoiceBody = ({ service }) => {
  console.log(service, 57757);
  const totalPrice = service?.reduce(
    (amount, newAmount) => amount + newAmount.cost,
    0
  );

  const userInsurance =
    service &&
    `${
      service[0]?.serviceInvoice?.amountTotal -
      service[0]?.serviceInvoice?.amountToBePaidByPatient
    }`;
  return (
    <div className="modal-body p-0">
      <div className="container">
        <div className="row py-4 px-5">
          <div className="col-6">
            <h6 className="mb-0">Bill to:</h6>
            <p className="mb-0">
              {service &&
                `${service[0]?.serviceInvoice?.patient?.firstName} ${service[0]?.serviceInvoice?.patient?.lastName}`}
            </p>
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

            <div className="col-3">
              <h6 className="my-3">Cost</h6>
            </div>
            <div className="col-3 px-0 text-right">
              <h6 className="my-3 px-0">Price Paid</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-5 py-4">
        {service?.map((services, index) => (
          <div key={index}>
            <div className="row">
              <div className="col-6">
                <h6 className="my-2">{services?.service?.name}</h6>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <p>&#8358; {services?.service?.cost}</p>
                  </div>
                  <div className="col-6">
                    <p className="text-right">&#8358; {services.cost}</p>
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
                  {service &&
                    `${formatAmount(service[0]?.serviceInvoice?.amountTotal)}`}
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
          <p className="mb-0">Payments method</p>
          <p>
            &#8358;{" "}
            {`${
              service &&
              `${formatAmount(totalPrice)} payment by ${
                service[0]?.serviceInvoice.paymentMethod
              }`
            }`}
          </p>
        </div>
      </div>
    </div>
  );
};
export { ServiceInvoiceBody };
