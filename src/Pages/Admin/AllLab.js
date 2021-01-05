import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";
import formatAmount from "../../utils/formatAmount";
import formatDate from "../../utils/formatDate";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import incomplete from "../../assets/img/incomplete.svg";
import { getAllLabTechniciansUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

let $ = window.$;
$.DataTables = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;

class AllLabTechnicians extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        labTechnicians: [],
    };
  }
  // console.log(categories);

  async componentDidMount() {
    this.fetchLabTechnicians().then(() => this.sync());
    // this.setState({
    //   user: JSON.parse(localStorage.getItem("authenticatedUser")),
    // });
  }

  async fetchLabTechnicians() {
    const fetchLabTechniciansUrl = getAllLabTechniciansUrl();
    const fetchLabTechniciansConfig = fetchConfig({
      url: fetchLabTechniciansUrl,
      method: "get",
    });
    try {
      const response = await fetchWrapper(fetchLabTechniciansConfig);
      console.log("name", response);
      this.setState({ labTechnicians: response.data.labTechnicians });
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
    const { labTechnicians } = this.state;
    console.log("findam", labTechnicians);
    return (
      <>
        <PageLoader />
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Our Lab Technicians</h4>
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
                        <h6 className="mt-0 mb-1">No of Lab Technicians</h6>
                        <div className="count text-primary fs-20">
                          {labTechnicians?.length}
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
                            <th>Lab Technicians Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {labTechnicians.map((labTechnicians, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {index + 1}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {labTechnicians?.fullName}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap" style={{textTransform: "lowercase"}}>
                                    {labTechnicians?.lab?.email}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted text-nowrap">
                                    {labTechnicians?.lab?.phoneNumber ?? "N/A"}
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
                                    to={`/AdminViewLabProfile/${labTechnicians?.lab?.id}`}
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
    );
  }
}

export default AllLabTechnicians;
