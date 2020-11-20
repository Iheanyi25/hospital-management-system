import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";

const apiUrl = process.env.REACT_APP_API_URL;

class PatientAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      accountBalance: 0,
      acceptedAppointments: [],
      activeAppointments: [],
      pendingAppointments: [],
      completedAppointments: [],
    };
  }

  async componentDidMount() {
    console.log(apiUrl);
    const { patientId } = this.state;
    console.log(patientId);
    const response = await fetch(
      `${apiUrl}/Patient/Account/GetAccountBalance?PatientId=${this.state.patientId}`
    );

    const data = await response.json();
    console.log(data);
    this.setState({
      accountBalance: data.accountBalance,
    });
  }

  fetchAccountsHistory = async () => {
    const request = await fetch(
      `${apiUrl}/Patient/Account/GetPatientAccountTransactions?PatientId=${this.state.patientId}`
    );
    const responses = await request.json();
    console.log({ responses });
  }

  render() {
    const {
      acceptedAppointments,
      pendingAppointments,
      activeAppointments,
      completedAppointments,
      accountBalance,
    } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title"> Account History</h4>
              <NavLink className="btn btn-primary" to="/PatientFundAccount">
                Fund my account
              </NavLink>
            </header>

            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-money"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Account Total (NGN)</h6>
                        <div className="count text-primary fs-20">
                          {accountBalance}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-03s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-money" />
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Account spent (NGN)</h6>
                        <div className="count text-primary fs-20">
                          {acceptedAppointments.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Amount</th>
                                <th>Transaction Type</th>
                                <th>Paid By</th>
                                <th>Medium Of Payment</th>
                                <th>Date</th>
                                <th>Account Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeAppointments
                                ? activeAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      {[
                                        appointment.applicationUser
                                          .applicationUser.firstName,
                                        appointment.applicationUser
                                          .applicationUser.lastName,
                                      ].toString(" ")}
                                    </td>
                                    <td>
                                      <strong>Liam</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                          liam@gmail.com
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        10 Feb 2018
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        9:15 - 9:45
                                        </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
                                          to="/AdminPreConsultation"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {acceptedAppointments
                                ? acceptedAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {[
                                        appointment.applicationUser
                                          .applicationUser.firstName,
                                        appointment.applicationUser
                                          .applicationUser.lastName,
                                      ].toString(" ")}
                                    </td>
                                    <td>
                                      <strong>Liam</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                          liam@gmail.com
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        10 Feb 2018
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        9:15 - 9:45
                                        </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
                                          to="/AdminPreConsultation"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedAppointments
                                ? completedAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      {[
                                        appointment.applicationUser
                                          .applicationUser.firstName,
                                        appointment.applicationUser
                                          .applicationUser.lastName,
                                      ].toString(" ")}
                                    </td>
                                    <td>
                                      <strong>Liam</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                          liam@gmail.com
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        10 Feb 2018
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        9:15 - 9:45
                                        </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
                                          to="/AdminPreConsultation"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-pending"
                        role="tabpanel"
                        aria-labelledby="pills-pending-tab"
                      >
                        <div className="table-responsive">
                          <table
                            className="table data-table"
                            data-columns='[
                                                                    { "data": "photo" },
                                                                    { "data": "name" },
                                                                    { "data": "email" },
                                                                    { "data": "phone" },
                                                                    { "data": "date-of-birth" },
                                                                    { "data": "address" },
                                                                    { "data": "actions" }
                                                                ]'
                            data-paging="true"
                            data-info="true"
                          >
                            <thead>
                              <tr className="bg-primary text-white">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date Of Birth</th>
                                <th>Address</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingAppointments
                                ? pendingAppointments.map((appointment) => (
                                  <tr>
                                    <td>
                                      <img
                                        src="./assets/content/user-40-1.jpg"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="rounded-500"
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      {[
                                        appointment.applicationUser
                                          .applicationUser.firstName,
                                        appointment.applicationUser
                                          .applicationUser.lastName,
                                      ].toString(" ")}
                                    </td>
                                    <td>
                                      <strong>Liam</strong>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center nowrap text-primary">
                                        <span className="icofont-ui-email p-0 mr-2" />
                                          liam@gmail.com
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        10 Feb 2018
                                        </div>
                                    </td>
                                    <td>
                                      <div className="text-muted text-nowrap">
                                        9:15 - 9:45
                                        </div>
                                    </td>

                                    <td>
                                      <div className="actions">
                                        <Link
                                          title="Pre-consultation"
                                          onClick={() =>
                                            (window.location.href =
                                              "/AdminPreConsultation")
                                          }
                                          to="/AdminPreConsultation"
                                          className="btn btn-secondary btn-sm btn-square rounded-pill"
                                        >
                                          <span className="btn-icon icofont-stethoscope-alt" />
                                        </Link>
                                        <button className="btn btn-info btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-edit" />
                                        </button>
                                        <button className="btn btn-error btn-sm btn-square rounded-pill">
                                          <span className="btn-icon icofont-ui-delete" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
                          </table>
                        </div>
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

export default PatientAccount;
