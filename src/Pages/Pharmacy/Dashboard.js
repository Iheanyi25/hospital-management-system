import React from "react";
import {
  Footer,
  PageLoader,
  PharmacyHeader,
  PharmacySidebar,
  TemplateSettings,
} from "../../Components";
import { getAllPrescriptionsUrl, pharmacyDashboardUrl } from "../../api/URLs";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";

let $ = window.$;
$.DataTables = require("datatables.net");
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDrugs: 0,
      numberOfDrugCategories: 0,
      numberOfDrugSubCategories: 0,
      drugCount: 0,
      prescriptions: [],
    };
  }
  async componentDidMount() {
    await this.fetchPrescriptions();
    const getPharmacyDashboard = pharmacyDashboardUrl();
    const getPharmacyDashboardConfig = fetchConfig({
      url: getPharmacyDashboard,
      method: "get",
    });
    const { data } = await fetchWrapper(getPharmacyDashboardConfig);
    this.setState({ drugCount: data.drugCount });
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
    const {
      numberOfDrugs,
      numberOfDrugCategories,
      numberOfDrugSubCategories,
      drugCount,
      prescriptions,
    } = this.state;
    return (
      <>
        <PageLoader />
        <div>
          {/* Horizontal navbar---Header */}
          {/* <PharmacyHeader /> */}

          {/* Vertical navbar */}
          <PharmacySidebar />

          <main className="main-content">
            <div className="app-loader">
              <i className="icofont-spinner-alt-4 rotate" />
            </div>
            <div className="main-content-wrap">
              <div className="page-content">
                <div className="row">
                  <div className="col col-12 col-md-6 col-xl-3">
                    <div className="card animated fadeInUp delay-01s bg-light">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col col-5">
                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                          </div>
                          <div className="col col-7">
                            <h6 className="mt-0 mb-1">Number of Drugs</h6>
                            <div className="count text-primary fs-20">
                              {drugCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col-12 col-md-6 col-xl-3">
                      <div className="card animated fadeInUp delay-02s bg-light">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col col-5">
                              <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                            </div>
                            <div className="col col-7">
                              <h6 className="mt-0 mb-1">Recent Prescriptions</h6>
                              <div className="count text-primary fs-20">
                                {prescriptions.length}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/* <div className="col col-12 col-md-6 col-xl-3">
                      <div className="card animated fadeInUp delay-04s bg-light">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col col-5">
                              <div className="icon p-0 fs-48 text-primary opacity-50 icofont-dollar-true"></div>
                            </div>
                            <div className="col col-7">
                              <h6 className="mt-0 mb-1 text-nowrap">
                                Pharmacists
                              </h6>
                              <div className="count text-primary fs-20">
                                5238
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                </div>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="card bg-light">
                        <div className="card-header">Welcome Pharm. Michael</div>
                        <div className="card-body">
                          You have 3 patients awaiting drug Prescription.
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="card text-white bg-dark">
                        <div className="card-header">Important Notes</div>
                        <div className="card-body">
                          CMD is to meet with all pharmacist heads of department for drug disbursement.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-0">
                  <div className="card-header">Recent Prescriptions</div>
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
                                  <div className="text-muted text-nowrap">
                                    {index + 1}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">{`${
                                    prescription?.patient?.firstName ?? ""
                                  } ${
                                    prescription?.patient?.lastName ?? ""
                                  }`}</div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">{`${
                                    prescription?.doctor?.firstName ?? ""
                                  } ${
                                    prescription?.doctor?.lastName ?? ""
                                  }`}</div>
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
                                        to={`/PharmacyDrugPrescription/${prescription?.id}`}
                                        className="btn btn-sm btn-block"
                                      >
                                        <span className="btn-icon icofont-server mr-2" />
                                        Dispense
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
            {/* </div> */}
          </main>

          {/* Footer */}
          <Footer />
        </div>
        {/* App Settings modals */}
        <TemplateSettings />
      </>
    );
  };
};

export default Dashboard;
