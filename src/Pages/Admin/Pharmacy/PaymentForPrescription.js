import React, { useContext } from "react";
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
import { notification } from "../../../utils/notification";
import { useHistory } from "react-router";

const PaymentForPrescription = observer(({ history }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const nextRoute =
    userType === "Admin"
      ? "/AdminManagePrescriptionInvoice"
      : "/AccountManagePrescriptionInvoice";

  const {
    location: {
      state: {
        amountTotal,
        amountToBePaidByPatient: amountDue,
        priceCalculationFormular,
        patient: { id: patientId, email },
        invoiceNumber,
      },
    },
  } = useHistory();
  const paidSuccessfully = async (
    referenceNumber,
    paymentMethod,
    description,
    initiatorId
  ) => {
    const payload = {
      patientId,
      invoiceNumber,
      totalAmount: amountDue,
      paymentMethod,
      referenceNumber,
      initiatorId,
    };

    const paymentUrl = payForDrugsUrl();
    const payForDrugsConfig = fetchConfig({
      url: paymentUrl,
      method: "post",
      data: payload,
    });
    try {
      const res = await fetchWrapper(payForDrugsConfig);
      notification.success({ message: res.data.message });
      history.push(nextRoute);
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
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
      totalAmount: amountDue,
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
      const res = await fetchWrapper(payForDrugsConfig);
      notification.success({ message: res.data.message });
      history.push(nextRoute);
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };

  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header">
            <h3>{`Payment for prescription invoice ${invoiceNumber}`}</h3>
          </header>
          {amountTotal === amountDue ? (
            <div className=" d-flex">
              <h4 className="">Total Amount:&nbsp;</h4>
              <h4 className="text-info"> &#x20A6;{formatAmount(amountDue)}</h4>
            </div>
          ) : (
            <div className="mb-5">
              <div className=" d-flex" style={{ height: "50px" }}>
                <h4 className="font-weight-light">Total Amount:&nbsp;</h4>
                <h4 className="text-info">&#x20A6;{formatAmount(amountDue)}</h4>
                <h6
                  className="text-muted"
                  style={{ marginTop: "28px", marginLeft: "5px" }}
                >
                  <s>&#x20A6;{formatAmount(amountTotal)}</s> &nbsp;
                </h6>
              </div>
              <span
                className="badge badge-light font-weight-light"
                style={{
                  background: "#F8F9FA",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {priceCalculationFormular}
              </span>
            </div>
          )}
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
                          details={{ amount: amountDue, email }}
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
                          details={{ amount: amountDue, email }}
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
                          details={{ amount: amountDue, email }}
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
                          details={{ amount: amountDue, email }}
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
