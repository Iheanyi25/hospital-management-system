import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";
import formatAmount from "../../utils/formatAmount";
import formatDate from "../../utils/formatDate";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import incomplete from "../../assets/img/incomplete.svg";
import { getAllAccountantsUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

let $ = window.$;
$.DataTables = require("datatables.net");

class AllAccountants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountants: [],
    };
  }
  // console.log(categories);

  async componentDidMount() {
    this.fetchAccountants().then(() => this.sync());
  }

  async fetchAccountants() {
    const fetchAccountantsUrl = getAllAccountantsUrl();
    const fetchAccountantsConfig = fetchConfig({
      url: fetchAccountantsUrl,
      method: "get",
    });
    try {
      const response = await fetchWrapper(fetchAccountantsConfig);
      console.log("name", response);
      this.setState({ accountants: response.data.labTechnicians });
    } catch (error) {
      console.log(error);
    }
  }
 
  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    console.log($(this.el));
  }

  render() {
    const { accountants } = this.state;
    console.log("findam", accountants);
    return (
      <>
        <PageLoader />
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Our Accountants</h4>
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
                        <h6 className="mt-0 mb-1">No of Accountants</h6>
                        <div className="count text-primary fs-20">
                          {accountants?.length}
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
                            <th>Accountant Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accountants.map((accountant, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {index + 1}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {accountant?.fullName}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap" style={{textTransform: "lowercase"}}>
                                    {accountant?.accountant?.email}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {accountant?.accountant?.phoneNumber ?? "N/A"}
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
                                    <NavLink
                                    to={`/AdminViewAccountantProfile/${accountant?.accountant?.id}`}
                                    className="btn btn-sm btn-block"
                                  >
                                    <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                    View Profile
                                  </NavLink>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        //{" "}
      </>
      // <div>
      //     hello world
      // </div>
    );
  }
}

export default AllAccountants;
