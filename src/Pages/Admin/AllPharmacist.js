import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";
import formatAmount from "../../utils/formatAmount";
import formatDate from "../../utils/formatDate";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import incomplete from "../../assets/img/incomplete.svg";
import { getAllPharmacistUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

let $ = window.$;
$.DataTables = require("datatables.net");
class AllPharmacists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pharmacists: [],
    };
  }
  // console.log(categories);

  async componentDidMount() {
    this.fetchPharmacists().then(() => this.sync());
    // this.setState({
    //   user: JSON.parse(localStorage.getItem("authenticatedUser")),
    // });
  }

  async fetchPharmacists() {
    
    try {
      const fetchPharmacistsUrl = getAllPharmacistUrl();
      const fetchPharmacistConfig = fetchConfig({ url: fetchPharmacistsUrl, method: "get" });
      const response = await fetchWrapper(fetchPharmacistConfig);
      console.log("name", response);
      this.setState({ pharmacists: response.data.pharmacists });
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
    const { pharmacists } = this.state;
    console.log("findam", pharmacists);
    return (
      <>
        <PageLoader />
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Our Pharmacists</h4>
              {/* {user.userType === "Admin" ? (
                <NavLink className="btn btn-primary" to="/AdminServiceRequests">
                  Request Service
                </NavLink>
              ) : null} */}
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
                        <h6 className="mt-0 mb-1">No of Pharmacists</h6>
                        <div className="count text-primary fs-20">
                          {pharmacists?.length}
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
                            <th>Pharmacists Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pharmacists.map((pharmacist, index) => {
                            return (
                              <tr>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {index + 1}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {pharmacist?.fullName}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap" style={{textTransform: "lowercase"}}>
                                    {pharmacist?.pharmacy?.email}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {pharmacist?.pharmacy?.phoneNumber ?? "N/A"}
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
                                    to={`/AdminViewPharmacistProfile/${pharmacist?.pharmacy?.id}`}
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

export default AllPharmacists;
