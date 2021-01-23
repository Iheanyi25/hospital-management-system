import React from "react";
import { PageLoader } from "../../Components";
import {
  PayOnline,
  PayCash,
  Others,
  PayFromAccount,
} from "../../Components/Payment/PaymentModes";
import formatAmount from "../../utils/formatAmount";
import { Success } from "../../Components/Alerts";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientRegistrationInvoiceUrl,
  getPatientsUrl,
  postPayPatientRegistrationFeeUrl,
  postPayPatientRegistrationFeeWithAccountUrl,
} from "../../api/URLs";

const $ = window.$;
$.Datatable = require("datatables.net");

class PatientRegistration extends React.Component {
  static contextType = UserContext;
  state = {
    patients: [],
    patientId: "",
    email: "",
    amount: "",
    invoiceNumber: "",
    success: false,
  };

  componentDidMount() {
    const { patientId, email, cost } = this.props.location.state;
    console.log(cost);
    this.setState({ patientId, email, amount: cost });
    console.log(patientId);
    this.fetPatientRegistrationIvoice(patientId);
    this.getAllPatients().then(() => this.sync());
  }
  fetPatientRegistrationIvoice = async (id) => {
    try {
      const getPatientRegistrationInvoice = getPatientRegistrationInvoiceUrl(
        id
      );
      const getPatientRegistrationInvoiceConfig = fetchConfig({
        url: getPatientRegistrationInvoice,
        method: "get",
      });
      const { data } = await fetchWrapper(getPatientRegistrationInvoiceConfig);

      console.log(data.patientRegistrationInvoice, 111111);
      this.setState({
        invoiceNumber: data.patientRegistrationInvoice?.invoiceNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async getAllPatients() {
    const getPatients = getPatientsUrl();
    const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
    const { data } = await fetchWrapper(getPatientsConfig);
    console.log(data, 22222);
    this.setState({ patients: data.patients });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  register = async (reference, modeOfPayment, description) => {
    const { amount, patientId, invoiceNumber } = this.state;
    let payload = {
      patientId: patientId,
      amount: amount,
      invoiceNumber: invoiceNumber,
      description: description,
      modeOfPayment: modeOfPayment,
      referenceNumber: reference,
    };

    console.log(payload);
    try {
      const postPayPatientRegistrationFee = postPayPatientRegistrationFeeUrl();
      const getPatientRegistrationInvoiceConfig = fetchConfig({
        url: postPayPatientRegistrationFee,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(getPatientRegistrationInvoiceConfig);
      console.log(res, 4444);
      if (res.status === 200) {
        console.log(res);
        this.setState({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  payWithAccount = async (
    reference,
    modeOfPayment,
    description,
    accountId,
    initiatorId
  ) => {
    const { amount, patientId, invoiceNumber } = this.state;
    let payload = {
      patientId: patientId,
      amount: amount,
      invoiceNumber: invoiceNumber,
      description: description,
      modeOfPayment: modeOfPayment,
      referenceNumber: reference,
      initiatorId: initiatorId,
      accountId: accountId,
    };
    console.log(payload);
    try {
      const postPayPatientRegistrationFee = postPayPatientRegistrationFeeWithAccountUrl();
      const getPatientRegistrationInvoiceConfig = fetchConfig({
        url: postPayPatientRegistrationFee,
        data: payload,
        method: "post",
      });
      const { status } = await fetchWrapper(
        getPatientRegistrationInvoiceConfig
      );
      console.log(status, 4444);
      if (status === 200) {
        this.setState({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const content = this.context;
    const { user } = content;
    const { amount, email } = this.state;
    const {
      history: { location },
    } = this.props;
    const {
      state: { name, patientId },
    } = location;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success ? (
            <Success
              history={this.props.history}
              message="Well done, you successfully registered this patient"
              nextRoute={
                user.userType === "Admin"
                  ? "/AdminAllPatients"
                  : "/AccountRegistrationInvoice"
              }
            />
          ) : null}
          <div className="main-content-wrap">
            <header className="page-heade">
              <h3>{`Register ${name}`}</h3>
            </header>
            <div className=" d-flex">
              <h4>Amount:&nbsp;</h4>
              <h4 className="text-info">{formatAmount(amount)}</h4>
            </div>

            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
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
                        className="tab-pane fade show active w-50 m-auto"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        <PayOnline
                          details={{ amount, email }}
                          paidSuccessfully={this.register}
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
                          details={{ amount, email }}
                          paidSuccessfully={this.payWithAccount}
                        />
                      </div>
                      <div
                        className="tab-pane fade w-50 m-auto"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <PayCash
                          details={{ amount, email }}
                          paidSuccessfully={this.register}
                        />
                      </div>
                      <div
                        className="tab-pane fade w-50 m-auto"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <Others
                          details={{ amount, email }}
                          paidSuccessfully={this.register}
                        />
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
  }
}

export default observer(PatientRegistration);
