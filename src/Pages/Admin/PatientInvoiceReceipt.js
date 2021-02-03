import React from "react";
import RecieptCost from "../../Components/Modals/RecieptCost";
import RecieptHeader from "./RecieptHeader";

const PatientInvoiceReceipt = ({ activeTransaction, patient }) => {

  return (
    <div>
      <RecieptHeader patient={patient} />
      <div className="container">
        <h4>Payment Reciept</h4>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <p className="m-0">Date issued</p>
            <p className="m-0">
              {new Date(activeTransaction?.trasactionDate).toLocaleDateString()}
            </p>
          </div>
          <div className="col-3">
            <p className="m-0">Payment made by:</p>
            <p className="m-0">{activeTransaction.initiator}</p>
          </div>
          <div className="col-3">
            <p className="m-0">123 Fake St</p>
            <p className="m-0">kilometer 7, Enugu</p>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        {/* {details?.map((detail, index) => ( */}
        {/* <div key={index}> */}
        <div className="row text-center">
          <p className="col-8 m-0">{activeTransaction.transactionType}</p>
          {/* <p className="col-4 m-0">
                        {" "}
                        {`${Number(detail?.numberOfUnits) ?? 0} packs, `}{" "}
                        {`${
                          Number(detail?.numberOfContainers) ?? 0
                        }  tablets, `}
                        {`${Number(detail?.numberOfCartons) ?? 0}  cartons`}
                      </p> */}
          <p className="col-3 m-0">&#8358; {activeTransaction.amount}</p>
          {/* </div> */}
        </div>
        <hr />
      </div>
      {/* ))} */}
      <RecieptCost cost={activeTransaction?.amount} />
    </div>
  );
};
export default PatientInvoiceReceipt;
