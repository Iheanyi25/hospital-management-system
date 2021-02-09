import React from 'react'
import { fetchConfig } from '../../api/fetchConfig'
import { useRequest } from '../../api/fetcher'
import { getPatientRegistrationInvoiceUrl } from '../../api/URLs'
import RecieptCost from '../../Components/Modals/RecieptCost'
import RecieptHeader from './RecieptHeader'

export default function PatientRegistrationReciept({activePatientId}) {
    console.log(activePatientId,4444)
    const getPatientRegistrationInvoice = getPatientRegistrationInvoiceUrl(
        activePatientId
      );
      const getPatientRegistrationInvoiceConfig = fetchConfig({
        url: getPatientRegistrationInvoice,
        method: "get",
      });
      const { data } =  useRequest(getPatientRegistrationInvoiceConfig);
      console.log(data,55555)
    return (
        <div>
            <RecieptHeader/>
            <div className="container">
        <h4>Payment Reciept</h4>
      </div>
      <div className="container">
        <div className="row">
        <div className="col-3">
            <p className="m-0">Invoice no:</p>
            <p className="m-0">{data?.patientRegistrationInvoice.invoiceNumber}</p>
          </div>
          <div className="col-3">
            <p className="m-0">Date issued</p>
            <p className="m-0">
              {new Date(data?.patientRegistrationInvoice.dateGenerated).toLocaleDateString()}
            </p>
          </div>
          <div className="col-3">
            <p className="m-0">Payment made by:</p>
            {/* <p className="m-0">{activeTransaction.initiator}</p> */}
          </div>
          <div className="col-3">
            <p className="m-0">Health Plan</p>
            <p className="m-0">{data?.patientRegistrationInvoice.healthPlan.name}</p>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        {/* {details?.map((detail, index) => ( */}
        {/* <div key={index}> */}
        <div className="row">
          <p className="col-5 m-0">Registration</p>
          {/* <p className="col-4 m-0">
                        {" "}
                        {`${Number(detail?.numberOfUnits) ?? 0} packs, `}{" "}
                        {`${
                          Number(detail?.numberOfContainers) ?? 0
                        }  tablets, `}
                        {`${Number(detail?.numberOfCartons) ?? 0}  cartons`}
                      </p> */}
          <p className="col-4 m-0">&#8358; {data?.patientRegistrationInvoice.amount}</p>
          {/* </div> */}
        </div>
        <hr />
      </div>
      {/* ))} */}
            <RecieptCost cost={data?.patientRegistrationInvoice.amount}/>
        </div>
    )
}
