import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { getAllHealthPlansUrl, disableHealthPlanUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { Success } from "../../../Components/Alerts";
import formatDate from "../../../utils/formatDate";

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageHealthPlans extends Component {
  state = {
    healthPlans: [],
    success: { show: false, message: "", delError: false },
  };

  async componentDidMount() {
    await this.getAllHealthPlans();
  }

  async getAllHealthPlans() {
    const getAllHealthPlans = getAllHealthPlansUrl();
    const getAllHealthPlansConfig = fetchConfig({
      url: getAllHealthPlans,
      method: "get",
    });
    const response = await fetchWrapper(getAllHealthPlansConfig);
    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    this.setState({ healthPlans: response?.data?.plans || [] }, () =>
      this.sync()
    );
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }
  resetShowState = () =>
    this.setState((state) => ({
      ...state,
      success: { show: false, message: " ", delError: false },
    }));

  disableHealthPlan = async (id) => {
    try {
      const disableHealthPlan = disableHealthPlanUrl();
      const disableHealthPlansConfig = fetchConfig({
        url: disableHealthPlan,
        method: "post",
        data: { id },
      });
      const res = await fetchWrapper(disableHealthPlansConfig);
      if (res.status === 200) {
        this.getAllHealthPlans();
        this.setState((state) => ({
          ...state,
          success: { show: true, message: res.data.message, delError: false },
        }));
      } else {
        throw "error occured";
      }
    } catch (error) {
      console.log(error);
      this.setState((state) => ({
        ...state,
        success: { show: true, message: "an error occured", delError: true },
      }));
    }
  };

  render() {
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
              <h4 className="page-title mb-0"> Manage Health Plans</h4>
              <NavLink className="btn btn-primary" to="/AdminCreateHealthPlan">
                Create Health Plan
              </NavLink>
            </header>
            <div className="page-content mt-5">
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
                          // data-ajax={""}
                        >
                          <thead>
                            <tr className="">
                              <th>#</th>
                              <th>Name</th>
                              <th>Cost</th>
                              <th>Renewal Cost</th>
                              <th>Patients Per Folder</th>
                              <th>Accounts Per Health Plan</th>
                              <th>Date</th>
                              <th>Instant billing</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.healthPlans.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>{index + 1}</strong>
                                </td>
                                <td>
                                  <strong>
                                    <div className="d-flex align-items-center nowrap">
                                      {item.name}
                                    </div>
                                  </strong>
                                </td>
                                <td>{item.cost}</td>
                                <td>
                                  <div className="d-flex align-items-center nowrap">
                                    {item.renewal}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center nowrap">
                                    {item.noOfPatients}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center nowrap">
                                    {item.noOfAccounts}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center nowrap">
                                    {formatDate(item.dateCreated)}
                                  </div>
                                </td>

                                <td>
                                  <div className="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="control2"
                                      checked={
                                        item.instantBilling ? true : false
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="control1"
                                    ></label>
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
                                            "/AdminEditHealthPlan/" + item.id,
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
                                        className="btn btn-sm btn-block text-danger"
                                        onClick={() =>
                                          this.deleteHealthPlan(item.id)
                                        }
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
