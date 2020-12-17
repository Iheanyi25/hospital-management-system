import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
// import formatDate from "../../../utils/formatDate";
// import paid from "../../../assets/img/paid.svg";
// import notpaid from "../../../assets/img/notpaid.svg";
// import incomplete from "../../../assets/img/incomplete.svg";

// let $ = window.$;
// $.DataTables = require("datatables.net");

class ManagePrescriptions extends React.Component {
  //   sync() {
  //     this.$el = $(this.el);
  //     this.$el.DataTable();
  //     console.log($(this.el));
  //   }

  render() {
    // const { user } = this.state;
    // console.log(this.state.categories);
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Prescriptions</h4>
            </header>
            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">No of Prescriptions</h6>
                        <div className="count text-primary fs-20">
                          {formatAmount(500)}
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
                    <div className="table-responsive">
                      <table
                        ref={(el) => (this.el = el)}
                        className="table table-striped"
                        data-paging="true"
                        data-info="true"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Patient Name</th>
                            <th>No of Drugs</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="text-muted text-nowrap">1</div>
                            </td>
                            <td>
                              <div className="text-muted text-nowrap">JB</div>
                            </td>
                            <td>
                              <div className="text-muted text-nowrap">20</div>
                            </td>
                            <td>
                              <div className="text-muted text-nowrap">
                                {formatAmount(3000)}
                              </div>
                            </td>
                            <td>
                              <div className="text-muted text-nowrap">Paid</div>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm btn-block dropdown-toggle"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Action
                                </button>
                                <div className="dropdown-menu">
                                  <Link
                                    to="/AdminDrugPrescription"
                                    className="btn btn-sm btn-block"
                                  >
                                    <span className="btn-icon icofont-server mr-2" />
                                    Prescribe
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default ManagePrescriptions;
