import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { getAllPrescriptionsUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import formatDate from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";

let $ = window.$;
$.DataTables = require("datatables.net");
class ManagePrescriptions extends React.Component {
  state = {
    prescriptions: [],
  };
  async componentDidMount() {
    await this.fetchPrescriptions();
  }

  async fetchPrescriptions() {
    const getPrescriptionsUrl = getAllPrescriptionsUrl();
    const getAllPrescriptionsConfig = fetchConfig({
      url: getPrescriptionsUrl,
      method: "get",
    });
    const response = await fetchWrapper(getAllPrescriptionsConfig);
    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    console.log(response.data.prescriptions);
    this.setState({ prescriptions: response?.data?.prescriptions || [] }, () =>
      this.sync()
    );
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    const { prescriptions } = this.state;
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
                          {formatAmount(prescriptions.length)}
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
                            <th>Doctor Name</th>
                            <th>Date of Prescription</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prescriptions?.map((prescription, index) => (
                            <tr key={index}>
                              <td>
                                <div className="text-muted text-nowrap">{index + 1}</div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">{`${prescription?.patient?.firstName ?? ""} ${prescription?.patient?.lastName ?? ""}`}</div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">{`${prescription?.doctor?.firstName ?? ""} ${prescription?.doctor?.lastName ?? ""}`}</div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  {formatDate(prescription?.datePrescribed)}
                                </div>
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
                                      to={`/AdminDrugPrescription/${prescription?.id}`}
                                      className="btn btn-sm btn-block"
                                    >
                                      <span className="btn-icon icofont-server mr-2" />
                                      Prescribe
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
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
