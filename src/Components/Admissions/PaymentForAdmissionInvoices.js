import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../mobx/UserState";
import {
  PayOnline,
  PayCash,
  PayFromAccount,
  Others,
} from "../../Pages/Components/FundingPaymentModes";
import formatAmount from "../../utils/formatAmount";
import { notification } from "../../utils/notification";
import {
  postPayForAdmissionUrl,
  postPayForAdmissionWithAccountUrl,
} from "../../api/URLs";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";

const PaymentForAdmissionInvoices = observer(({ history }) => {
  const {
    state: { patientId, amount: displayAmount },
  } = history.location;
  const { id: admissionId } = useParams();
  const {
    user: { email, id: initiatorId, userType },
  } = useContext(UserContext);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
  });

  const setPaymentParams = (key, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [key]: value,
    });
    console.log(paymentDetails);
  };

  const payForInvoice = async (
    transactionReference,
    paymentMethod,
    description
  ) => {
    const { amount } = paymentDetails;
    const payload = {
      admissionId,
      totalAmount: amount,
      paymentMethod,
      transactionReference,
      initiatorId,
    };
    const nextRoute =
      userType === "Admin"
        ? `/AdminManageAdmissionInvoices/${admissionId}`
        : "/AccountantManageAccounts";

    try {
      const payForAdmission = (paymentMethod = "account"
        ? postPayForAdmissionWithAccountUrl()
        : postPayForAdmissionUrl());
      const payForAdmissionConfig = fetchConfig({
        url: payForAdmission,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(payForAdmissionConfig);
      notification.success({ message: res.data.message });
      history.push(nextRoute);
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };

  //   const payForInvoiceWithAccount = async (
  //     transactionReference,
  //     paymentMethod,
  //     description
  //   ) => {
  //     const { amount } = paymentDetails;
  //     const payload = {
  //       admissionId,
  //       totalAmount: amount,
  //       paymentMethod,
  //       transactionReference,
  //       initiatorId,
  //     };
  //     const nextRoute =
  //       userType === "Admin"
  //         ? "/AdminManageAccounts"
  //         : "/AccountantManageAccounts";
  //     try {
  //       const payForAdmission = postPayForAdmissionWithAccountUrl();
  //       const payForAdmissionConfig = fetchConfig({
  //         url: payForAdmission,
  //         data: payload,
  //         method: "post",
  //       });
  //       const res = await fetchWrapper(payForAdmissionConfig);
  //       notification.success({ message: res.data.message });
  //       history.push(nextRoute);
  //     } catch (error) {
  //       console.log(error);
  //       notification.error({ message: error?.response?.data.message });
  //     }
  //     console.log(payload);
  //   };
  return (
    <main className="main-content">
      <div className="app-loader">
        <i className="icofont-spinner-alt-4 rotate" />
      </div>
      <div className="main-content-wrap">
        <header className="page-header">
          <h3>{`Payment for Admmission Invoice`}</h3>
        </header>
        <div className=" d-flex">
          <h4 className="font-weight-light">Total Amount:&nbsp;</h4>
          <h4 className="text-info"> &#x20A6;{formatAmount(displayAmount)}</h4>
        </div>
        <div className="page-content">
          <div className="card mb-0">
            <div className="card-body">
              <div>
                <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
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
                      details={{ email, amount: 2000 }}
                      paidSuccessfully={payForInvoice}
                      setPaymentParams={setPaymentParams}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-accepted"
                    role="tabpanel"
                    aria-labelledby="pills-accepted-tab"
                  >
                    <PayCash
                      amount={{ amount: 2000 }}
                      paidSuccessfully={payForInvoice}
                      setPaymentParams={setPaymentParams}
                    />
                  </div>
                  <div
                    className="tab-pane fade w-50 m-auto"
                    id="pills-account"
                    role="tabpanel"
                    aria-labelledby="pills-account-tab"
                  >
                    <PayFromAccount
                      patientId={patientId}
                      details={{ amount: 2000 }}
                      paidSuccessfully={payForInvoice}
                      setPaymentParams={setPaymentParams}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-completed"
                    role="tabpanel"
                    aria-labelledby="pills-completed-tab"
                  >
                    <Others
                      amount={{ amount: 3000 }}
                      paidSuccessfully={payForInvoice}
                      setPaymentParams={setPaymentParams}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

export default PaymentForAdmissionInvoices;
