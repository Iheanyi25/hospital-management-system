import React, { useState, useContext } from "react";
import { PageLoader } from "../../../Components";
import { observer } from "mobx-react";
import {
  PayOnline,
  PayCash,
  Others,
  PayFromAccount,
} from "../../../Components/Payment/PaymentModes";
import formatAmount from "../../../utils/formatAmount";
import { UserContext } from "../../../mobx/UserState";
import { payForDrugsUrl, payForDrugsWithAccountUrl } from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { Success } from "../../../Components/Alerts";

const PaymentForPrescription = observer(({ history }) => {
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const {
    user: { userType },
  } = useContext(UserContext);
  console.log(history.location.state);
  const {
    amountTotal: amount,
    patient: { id: patientId, email },
    invoiceNumber,
  } = history.location.state;

  const paidSuccessfully = async (
    referenceNumber,
    paymentMethod,
    description,
    initiatorId
  ) => {
    const payload = {
      patientId,
      invoiceNumber,
      totalAmount: amount,
      paymentMethod,
      referenceNumber,
      initiatorId,
    };
    console.log(payload);
    const paymentUrl = payForDrugsUrl();
    const payForDrugsConfig = fetchConfig({
      url: paymentUrl,
      method: "post",
      data: payload,
    });
    try {
      const { status, message } = await fetchWrapper(payForDrugsConfig);
      if (status === 200) {
        setSuccess({ status: true, message: message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const payWithAccount = async (
    referenceNumber,
    paymentMethod,
    description,
    initiatorId
  ) => {
    const payload = {
      patientId,
      invoiceNumber,
      totalAmount: amount,
      paymentMethod,
      referenceNumber,
      initiatorId,
    };
    console.log(payload);
    const paymentUrl = payForDrugsWithAccountUrl();
    const payForDrugsConfig = fetchConfig({
      url: paymentUrl,
      method: "post",
      data: payload,
    });
    try {
      const { status, message } = await fetchWrapper(payForDrugsConfig);
      if (status === 200) {
        setSuccess({ status: true, message: message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { status, message } = success;
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        {status ? (
          <Success
            nextRoute={
              userType === "Admin"
                ? "/AdminManagePrescriptionInvoice"
                : "/AccountManagePrescriptionInvoice"
            }
            message={message}
          />
        ) : null}
        <div className="main-content-wrap">
          <header className="page-header">
            <h3>{`Payment for prescription invoice ${invoiceNumber}`}</h3>
          </header>
          <div className=" d-flex">
            <h4 className="font-weight-light">Total Amount:&nbsp;</h4>
            <h4 className="text-info"> &#x20A6;{formatAmount(amount)}</h4>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div className="col-12 col-md-10 m-auto">
                  <div>
                    <ul
                      className="nav nav-tabs mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="pills-active-tab"
                          data-toggle="pill"
                          href="#pills-active"
                          role="tab"
                          aria-controls="pills-active"
                          aria-selected="true"
                        >
                          Pay online
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-accepted-tab"
                          data-toggle="pill"
                          href="#pills-accepted"
                          role="tab"
                          aria-controls="pills-accepted"
                          aria-selected="false"
                        >
                          Pay cash
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-account-tab"
                          data-toggle="pill"
                          href="#pills-account"
                          role="tab"
                          aria-controls="pills-account"
                          aria-selected="false"
                        >
                          Pay from account
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-completed-tab"
                          data-toggle="pill"
                          href="#pills-completed"
                          role="tab"
                          aria-controls="pills-completed"
                          aria-selected="false"
                        >
                          Other options
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        <PayOnline
                          details={{ amount, email }}
                          paidSuccessfully={paidSuccessfully}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <PayCash
                          details={{ amount, email }}
                          paidSuccessfully={paidSuccessfully}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-account"
                        role="tabpanel"
                        aria-labelledby="pills-account-tab"
                      >
                        <PayFromAccount
                          patientId={patientId}
                          details={{ amount, email }}
                          paidSuccessfully={payWithAccount}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <Others
                          details={{ amount, email }}
                          paidSuccessfully={paidSuccessfully}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

export default PaymentForPrescription;
