import React from "react";
import { PageLoader } from "../../Components";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getDAllrugDispencingInvoicesUrl,
  getDrugsInAnInvoice,
  markInvoiceAsDispensedUrl,
  getAllAccountsUrl,
  getAllServiceRequestInvoiceUrl,
  getRegistrationFeeInvoiceUrl,
} from "../../api/URLs";
import formatAmount from "../../utils/formatAmount";
import formatDate from "../../utils/formatDate";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import { PrescriptionReciept } from "../../Components/Modals";
import { notification } from "../../utils/notification";

// const $ = window.$;
let $ = window.$;
const echarts = require("echarts");
$.DataTables = require("datatables.net");
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      serviceRequestInvoices: [],
      registrationInvoices: [],
      prescriptionInvoices: [],
      drugs: [],
    };
  }

  async componentDidMount() {
    this.surveyEcharts();
    this.fetchInvoices();
    this.fecthAllAcounts();
    this.fetchServiceRequestInvoices();
    this.fetchPrescriptionInvoices();
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

  async fetchDrugsInAnInvoice(invoiceNumber) {
    const invoicesUrl = getDrugsInAnInvoice(invoiceNumber);
    const getDrugsInAnInvoiceConfig = fetchConfig({
      url: invoicesUrl,
      method: "get",
    });
    const response = await fetchWrapper(getDrugsInAnInvoiceConfig);
    console.log(response);
    this.setState({ drugs: response?.data?.drugsInInvoice || [] });
  }

  async markInvoiceAsDispensed(id) {
    try {
      const markInvoiceUrl = markInvoiceAsDispensedUrl(id);
      const markInvoiceAsDispensedConfig = fetchConfig({
        url: markInvoiceUrl,
        method: "post",
      });
      const res = await fetchWrapper(markInvoiceAsDispensedConfig);
      if (res.status === 200) {
        this.setState({ ...this.state, success: true });
        notification.success({ message: res.data.message });
        this.fetchPrescriptionInvoices();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  async surveyEcharts() {
    if ($("#surveyEcharts").length) {
      var myChart = echarts.init(document.getElementById("surveyEcharts"));

      var options = {
        color: ["#ed5564", "#336cfb"],
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["Patients 2018", "Patients 2019"],
        },
        grid: {
          left: 30,
          right: 0,
          top: 50,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#336cfb",
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Patients " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            data: [
              "2019-1",
              "2019-2",
              "2019-3",
              "2019-4",
              "2019-5",
              "2019-6",
              "2019-7",
              "2019-8",
              "2019-9",
              "2019-10",
              "2019-11",
              "2019-12",
            ],
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#ed5564",
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Patients " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            data: [
              "2018-1",
              "2018-2",
              "2018-3",
              "2018-4",
              "2018-5",
              "2018-6",
              "2018-7",
              "2018-8",
              "2018-9",
              "2018-10",
              "2018-11",
              "2018-12",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Patients 2018",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: [159, 149, 174, 182, 219, 201, 175, 182, 119, 118, 112, 96],
          },
          {
            name: "Patients 2019",
            type: "line",
            smooth: true,
            data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226],
          },
        ],
      };

      myChart.setOption(options);

      // Resize chart
      $(function () {
        $(window).on("resize", resize);

        function resize() {
          setTimeout(function () {
            myChart.resize();
          }, 200);
        }
      });
    }
  }

  async fetchInvoices() {
    const getRegistrationFeeInvoice = getRegistrationFeeInvoiceUrl(
      this.state.doctorId
    );
    const getRegistrationFeeInvoiceConfig = fetchConfig({
      url: getRegistrationFeeInvoice,
      method: "get",
    });
    const { data } = await fetchWrapper(getRegistrationFeeInvoiceConfig);

    this.setState({ registrationInvoices: data.registrationInvoices });
  }

  async fetchServiceRequestInvoices() {
    const getAllServiceRequestInvoice = getAllServiceRequestInvoiceUrl(1);
    const getAllServiceRequestInvoiceConfig = fetchConfig({
      url: getAllServiceRequestInvoice,
      method: "get",
    });
    const { data } = await fetchWrapper(getAllServiceRequestInvoiceConfig);

    this.setState({ serviceRequestInvoices: data.serviceInvoices });
  }

  fecthAllAcounts = async () => {
    const getAllAccounts = getAllAccountsUrl(1);
    const getAllAccountsUrlConfig = fetchConfig({
      url: getAllAccounts,
      method: "get",
    });
    const { data } = await fetchWrapper(getAllAccountsUrlConfig);

    this.setState({ accounts: data.accounts });
  };

  filterInvoiceLength = (value) => {
    return this.state.registrationInvoices.filter(
      (val) => val.paymentStatus === value
    ).length;
  };

  render() {
    const { prescriptionInvoices, serviceRequestInvoices, drugs } = this.state;
    console.log(prescriptionInvoices);
    const { accounts } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row">
                <div className="col col-12 col-md-6 col-xl-4">
                  <div className="card animated fadeInUp delay-01s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">Accounts</h6>
                          <div className="count text-primary fs-20">
                            {accounts.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-4">
                  <div className="card animated fadeInUp delay-02s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-5">
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">
                            Registration Invoices (Unpaid)
                          </h6>
                          <div className="count text-primary fs-20">
                            {this.filterInvoiceLength("Paid")}
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
                          <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                        </div>
                        <div className="col col-7">
                          <h6 className="mt-0 mb-1">
                            Service Request Invoices (Unpaid)
                          </h6>
                          <div className="count text-primary fs-20">
                            {serviceRequestInvoices.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">Income Chat</div>
                <div className="card-body">
                  <div
                    id="surveyEcharts"
                    className="chat-container container-h-400"
                  />
                </div>
              </div>

              <div className="card mb-0">
                <div className="card-header">Prescription Invoices</div>
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
                            <th>Dispensed</th>
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
                                  <div className="text-muted text-nowrap">
                                    {prescriptionInvoice?.isDispensed ===
                                    false ? (
                                      <>
                                        <img src={notpaid} alt="not paid" /> Not
                                        dispensed
                                      </>
                                    ) : (
                                      <>
                                        <img src={paid} alt="paid" /> Dispensed
                                      </>
                                    )}
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
                                      {prescriptionInvoice?.paymentStatus ===
                                      "NOT PAID" ? (
                                        <Link
                                          to={{
                                            pathname: `/AccountPaymentForPrescription/${prescriptionInvoice.id}`,
                                            state: prescriptionInvoice,
                                          }}
                                          className="btn btn-sm btn-block"
                                        >
                                          <span className="btn-icon icofont-server mr-2" />
                                          Pay now
                                        </Link>
                                      ) : (
                                        <>
                                          <Link
                                            to="#"
                                            className="btn btn-sm btn-block"
                                            data-toggle="modal"
                                            data-target="#view-reciept"
                                            onClick={() =>
                                              this.fetchDrugsInAnInvoice(
                                                prescriptionInvoice.invoiceNumber
                                              )
                                            }
                                          >
                                            <span className="btn-icon icofont-server mr-2" />
                                            View Reciept
                                          </Link>
                                        </>
                                      )}
                                    </div>
                                  </div>
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

        <PrescriptionReciept costingDetails={drugs} />
      </>
    );
  }
}

export default Dashboard;
