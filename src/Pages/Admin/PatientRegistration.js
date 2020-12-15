import React from "react";
import { PageLoader } from "../../Components";
import {
  PayOnline,
  PayCash,
  Others,
} from "../../Components/Payment/PaymentModes";
import formatAmount from "../../utils/formatAmount";
import { Success } from "../../Components/Alerts";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class PatientRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem("authenticatedUser")),
      patients: [],
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: "",
      email: "",
      amount: "",
      invoiceNumber: "",
      success: false,
    };
  }

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
      let res = await fetch(
        `https://hms-tenece.azurewebsites.net/api/Admin/GetPatientRegistrationInvoice?patientId=${id}`,
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "GET",
          redirect: "follow",
        }
      );
      const data = await res.json();
      console.log( data.patientRegistrationInvoice);
      this.setState({
        invoiceNumber: data.patientRegistrationInvoice?.invoiceNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async getAllPatients() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Patient/GetPatients`);
    const data = await response.json();
    this.setState({ patients: data.patients });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  register = async (reference, modeOfPayment, description, paidOffline) => {
    const { amount, patientId, invoiceNumber } = this.state;
    let payload = {
      patientId: patientId,
      amount: amount,
      invoiceNumber: invoiceNumber,
      description:
        modeOfPayment === ("online-paystack" || "online-flutterwave")
          ? "Paid online"
          : paidOffline
          ? description
          : description.description,
      modeOfPayment: modeOfPayment,
      referenceNumber:
        modeOfPayment === "online-paystack"
          ? reference.trxref
          : modeOfPayment === "online-flutterwave"
          ? reference.data?.data?.orderRef
          : paidOffline
          ? reference
          : "",
    };

    console.log(payload);
    try {
      let res = await fetch(
        `https://hms-tenece.azurewebsites.net/api/Admin/PayPatientRegistrationFee`,
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );
      if (res.status === 200) {
        console.log(res);
        this.setState({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { amount, email, user } = this.state;
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
              <h3>Payment for registration</h3>
            </header>
            <div className=" d-flex">
              <h4>Amount:&nbsp;</h4>
              <h4 className="text-info">{formatAmount(this.state.amount)}</h4>
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
              <div className="add-action-box">
                <button
                  className="btn btn-primary btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-appointment"
                >
                  <span className="btn-icon icofont-stethoscope-alt" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default PatientRegistration;
