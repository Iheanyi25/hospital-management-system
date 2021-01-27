import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { deleteServiceUrl, getAllServicesUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { Success } from "../../../Components/Alerts";
import TableSize from "../../../Components/DataTable/TableSize";
import { UserContext } from "../../../mobx/UserState";

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageServices extends Component {
  static contextType = UserContext;
  state = {
    services: [],
    success: { show: false, message: "", delError: false },
  };

  async componentDidMount() {
    await this.fetchAllServices();
  }

  async fetchAllServices() {
    const getAllServices = getAllServicesUrl();
    const getAllServicesConfig = fetchConfig({
      url: getAllServices,
      method: "get",
    });
    const { data } = await fetchWrapper(getAllServicesConfig);

    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    this.setState(
      (state) => ({ ...state, services: data }),
      () => this.sync()
    );
    console.log({ data });
  }

  deleteMe = async (id) => {
    try {
      const deleteService = deleteServiceUrl();
      const deleteServiceConfig = fetchConfig({
        url: deleteService,
        data: { id },
        method: "post",
      });
      const res = await fetchWrapper(deleteServiceConfig);

      if (res.status === 200) {
        this.fetchAllServices();
        this.setState((state) => ({
          ...state,
          success: {
            show: true,
            message: "service successfully deleted",
            delError: false,
          },
        }));
      } else {
        throw "error occured";
      }
    } catch (error) {
      console.log(error);
      this.setState((state) => ({
        ...state,
        success: {
          show: true,
          message: "can't delete this service, service is tied to a request",
          delError: true,
        },
      }));
    }
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  resetShowState = () =>
    this.setState((state) => ({
      ...state,
      success: { show: false, message: " ", delError: false },
    }));

  render() {
    const {
      user: { userType },
    } = this.context;
    console.log(this.state);
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success.show && (
            <Success
              message={this.state.success.message}
              callback={this.resetShowState}
              isError={this.state.success.delError}
            />
          )}
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title mb-0"> Manage Services</h4>
              <NavLink
                className="btn btn-primary"
                to={
                  userType === "Admin"
                    ? "/AdminCreateService"
                    : "/LabCreateService"
                }
              >
                Create Service
              </NavLink>
            </header>
            <div className="page-content mt-5">
              <TableSize size={this.state.services.length} heading="No Of Services" />
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
                            {this.state.services.map((item, index) => (
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
                                            userType === "Admin"
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
                            ))}
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
