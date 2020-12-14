import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";
import TableSize from "../../../Components/DataTable/TableSize";

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageServices extends Component {
  state = {
    user: {},
    services: [],
  };

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("authenticatedUser")),
    });
    this.fetchAllServices().then(() => this.sync());
  }

  fetchAllServices = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}/Admin/GetAllServices`
    );
    let data = await request.json();
    this.setState({ services: data });
    console.log({ data });
  };

  deleteMe = async (id) => {
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/Admin/DeleteService`,
      {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "POST",
        body: JSON.stringify({ id }),
        redirect: "follow",
      }
    );
    if (res.status === 200) {
      this.setState({ success: true }, () => {
        this.fetchAllServices();
      });
    }
    console.log({ res });
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title mb-0"> Manage Services</h4>
              <NavLink
                className="btn btn-primary"
                to={
                  user.userType === "Admin"
                    ? "/AdminCreateService"
                    : "/LabCreateService"
                }
              >
                Create Service
              </NavLink>
            </header>
            <div className="page-content mt-5"> 
              <TableSize size={this.state.services.length} heading="Services"  />
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table
                          ref={(el) => (this.el = el)}
                          className="table table-striped"
                          data-paging="true"
                          data-info="true"
                          data-searching="true"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Services</th>
                              <th>Cost</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.services.length > 0 ? (
                              this.state.services.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <strong>{index + 1}</strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {" "}
                                      <div className="d-flex align-items-center nowrap">
                                        {item.name}
                                      </div>
                                    </strong>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center nowrap">
                                      {item.cost}
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
                                          title="Pre-consultation"
                                          to={{
                                            pathname:
                                              user.userType === "Admin"
                                                ? "/AdminEditService/" + item.id
                                                : "/LabEditService/" + item.id,
                                            state: item,
                                          }}
                                          className="btn btn-sm btn-block text-primary"
                                        >
                                          <span className="btn-icon icofont-edit-alt mr-2" />
                                          Edit
                                        </Link>
                                        <Link
                                          title="Pre-consultation"
                                          to="#"
                                          onClick={() => this.deleteMe(item.id)}
                                          className="btn btn-sm btn-block text-danger"
                                        >
                                          <span className="btn-icon icofont-delete-alt mr-2" />
                                          Delete
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td></td>
                                <td colSpan={2}>Loading...</td>
                                <td></td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
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
