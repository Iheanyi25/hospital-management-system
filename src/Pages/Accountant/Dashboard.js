import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getAllAccountsUrl, getAllServiceRequestInvoiceUrl, getRegistrationFeeInvoiceUrl  } from "../../api/URLs";
import { PageLoader } from "../../Components";
const $ = require("jquery");
const echarts = require("echarts");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      registrationInvoices: [],
      serviceRequestInvoices: [],
    };
  }

  async componentDidMount() {
    this.surveyEcharts()
    this.fetchInvoices();
    this.fecthAllAcounts();
    this.fetchServiceRequestInvoices();
    this.setState({
      user: JSON.parse(localStorage.getItem("authenticatedUser")),
    });
  }

  async surveyEcharts() {
    if ($('#surveyEcharts').length) {
      var myChart = echarts.init(document.getElementById('surveyEcharts'));

      var options = {
        color: ['#ed5564', '#336cfb'],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['Patients 2018', 'Patients 2019']
        },
        grid: {
          left: 30,
          right: 0,
          top: 50,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#336cfb'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return 'Patients ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#ed5564'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return 'Patients ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: ['2018-1', '2018-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Patients 2018',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [159, 149, 174, 182, 219, 201, 175, 182, 119, 118, 112, 96]
          },
          {
            name: 'Patients 2019',
            type: 'line',
            smooth: true,
            data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226]
          }
        ]
      };

      myChart.setOption(options);

      // Resize chart
      $(function() {
        $(window).on('resize', resize);

        function resize() {
          setTimeout(function() { myChart.resize() }, 200);
        }
      })
    }
  }

  async fetchInvoices() {
    const getRegistrationFeeInvoice = getRegistrationFeeInvoiceUrl(this.state.doctorId)
    const getRegistrationFeeInvoiceConfig = fetchConfig({url : getRegistrationFeeInvoice, method : 'get'})
    const { data } = await fetchWrapper(getRegistrationFeeInvoiceConfig)

    this.setState({ registrationInvoices: data.registrationInvoices });
  }

  async fetchServiceRequestInvoices() {
    const getAllServiceRequestInvoice = getAllServiceRequestInvoiceUrl()
    const getAllServiceRequestInvoiceConfig = fetchConfig({url : getAllServiceRequestInvoice, method : 'get'})
    const { data } = await fetchWrapper(getAllServiceRequestInvoiceConfig)

    this.setState({ serviceRequestInvoices: data.serviceInvoices });
  }

  fecthAllAcounts = async () => {
    const getAllAccounts = getAllAccountsUrl()
    const getAllAccountsUrlConfig = fetchConfig({url : getAllAccounts, method : 'get'})
    const { data } = await fetchWrapper(getAllAccountsUrlConfig)

    this.setState({ accounts: data.accounts });
  };

  filterInvoiceLength = (value) => {
    return this.state.registrationInvoices.filter(
      (val) => val.paymentStatus === value
    ).length;
  };

  render() {
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
                            {this.state.serviceRequestInvoices.length}
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
                <div className="card-header">Recent Payments</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Photo</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Date</th>
                          <th scope="col">Visit time</th>
                          <th scope="col">Number</th>
                          <th scope="col">Doctor</th>
                          <th scope="col">Injury / Condition</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              alt="avatar"
                              src="../assets/content/user-40-1.jpg"
                              width={40}
                              height={40}
                              className="rounded-500"
                            />
                          </td>
                          <td>
                            <strong>Liam</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-email p-0 mr-2" />{" "}
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
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-cell-phone p-0 mr-2" />{" "}
                              0126595743
                            </div>
                          </td>
                          <td>Dr. Benjamin</td>
                          <td>mumps</td>
                          <td>
                            <div className="actions">
                              <button className="btn btn-info btn-sm btn-square rounded-pill">
                                <span className="btn-icon icofont-ui-edit" />
                              </button>
                              <button className="btn btn-error btn-sm btn-square rounded-pill">
                                <span className="btn-icon icofont-ui-delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="avatar"
                              src="../assets/content/user-40-2.jpg"
                              width={40}
                              height={40}
                              className="rounded-500"
                            />
                          </td>
                          <td>
                            <strong>Emma</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-email p-0 mr-2" />{" "}
                              emma@gmail.com
                            </div>
                          </td>
                          <td>
                            <div className="text-muted text-nowrap">
                              5 Dec 2018
                            </div>
                          </td>
                          <td>
                            <div className="text-muted text-nowrap">
                              9:00 - 9:30
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-cell-phone p-0 mr-2" />{" "}
                              0126595743
                            </div>
                          </td>
                          <td>Dr. Liam</td>
                          <td>arthritis</td>
                          <td>
                            <div className="actions">
                              <button className="btn btn-info btn-sm btn-square rounded-pill">
                                <span className="btn-icon icofont-ui-edit" />
                              </button>
                              <button className="btn btn-error btn-sm btn-square rounded-pill">
                                <span className="btn-icon icofont-ui-delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="avatar"
                              src="../assets/content/user-40-3.jpg"
                              width={40}
                              height={40}
                              className="rounded-500"
                            />
                          </td>
                          <td>
                            <strong>Olivia</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-email p-0 mr-2" />{" "}
                              olivia@gmail.com
                            </div>
                          </td>
                          <td>
                            <div className="text-muted text-nowrap">
                              13 Oct 2018
                            </div>
                          </td>
                          <td>
                            <div className="text-muted text-nowrap">
                              12:00 - 12:45
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center nowrap text-primary">
                              <span className="icofont-ui-cell-phone p-0 mr-2" />{" "}
                              0126595743
                            </div>
                          </td>
                          <td>Dr. Noah</td>
                          <td>depression</td>
                          <td>
                            <div className="actions">
                              <button className="btn btn-info btn-sm btn-square rounded-pill">
                                <span className="btn-icon icofont-ui-edit" />
                              </button>
                              <button className="btn btn-error btn-sm btn-square rounded-pill">
                                <span className="btn-icon icofont-ui-delete" />
                              </button>
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
        </main>
        <div className="content-overlay" />
      </>
    );
  }
}

export default Dashboard;
