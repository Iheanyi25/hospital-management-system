import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { getDAllrugDispencingInvoicesUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import formatDate from "../../../utils/formatDate";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";

let $ = window.$;
$.DataTables = require("datatables.net");
class ManagePrescriptionInvoice extends React.Component {
  static contextType = UserContext;
  state = {
    prescriptionInvoices: [],
  };
  async componentDidMount() {
    await this.fetchPrescriptionInvoices();
  }

  async fetchPrescriptionInvoices() {
    const invoicesUrl = getDAllrugDispencingInvoicesUrl();
    const getDAllrugDispencingInvoicesConfig = fetchConfig({
      url: invoicesUrl,
      method: "get",
    });
    const response = await fetchWrapper(getDAllrugDispencingInvoicesConfig);
    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    console.log(response);
    this.setState(
      { prescriptionInvoices: response?.data?.drugInvoices || [] },
      () => this.sync()
    );
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    const content = this.context;
    const { user } = content;
    const { prescriptionInvoices } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Prescription Invoices</h4>
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
                        <h6 className="mt-0 mb-1">
                          No of prescription invoice
                        </h6>
                        <div className="count text-primary fs-20">
                          {formatAmount(prescriptionInvoices.length)}
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
                            <th>Invoice No</th>
                            <th>Date Generated</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prescriptionInvoices?.map(
                            (prescriptionInvoice, index) => (
                              <tr>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {index + 1}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {`${prescriptionInvoice?.patient?.firstName} ${prescriptionInvoice?.patient?.lastName}`}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {prescriptionInvoice?.invoiceNumber}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {formatDate(
                                      prescriptionInvoice?.dateGenerated
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {formatAmount(
                                      prescriptionInvoice?.amountTotal
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {prescriptionInvoice?.paymentStatus ===
                                    "NOT PAID" ? (
                                      <>
                                        <img src={notpaid} alt="not paid" /> Not
                                        paid
                                      </>
                                    ) : (
                                      <>
                                        <img src={paid} alt="paid" /> Paid
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  {prescriptionInvoice?.paymentStatus ===
                                  "NOT PAID" ? (
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
                                          to={{
                                            pathname:
                                              user.userType === "Admin"
                                                ? `/AdminPaymentForPrescription/${prescriptionInvoice.id}`
                                                : `/AccountPaymentForPrescription/${prescriptionInvoice.id}`,
                                            state: prescriptionInvoice,
                                          }}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-server mr-2" />
                                          Pay now
                                        </Link>
                                      </div>
                                    </div>
                                  ) : (
                                    "Paid"
                                  )}
                                </td>
                              </tr>
                            )
                          )}
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

export default observer(ManagePrescriptionInvoice);
