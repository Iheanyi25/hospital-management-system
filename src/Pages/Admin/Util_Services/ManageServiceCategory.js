import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { deleteServiceCategoryUrl, getAllServicesCategoryUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { Success } from "../../../Components/Alerts";
import TableSize from "../../../Components/DataTable/TableSize";

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageServiceCategory extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("authenticatedUser")),
    categories: [],
    success: { show: false, message: "", delError: false },
  };

  async componentDidMount() {
    this.fetchAllServiceCategories()
  }

  fetchAllServiceCategories = async () => {
    const getAllServicesCategory = getAllServicesCategoryUrl()
    const getAllServicesCategoryConfig = fetchConfig({url : getAllServicesCategory, method : 'get'})
    const {data} = await fetchWrapper(getAllServicesCategoryConfig)

    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    this.setState((state) => ({...state, categories: data }), () => this.sync() );
  };

  deleteMe = async (id) => {
   
    try {
      const deleteServiceCategory = deleteServiceCategoryUrl()
      const deleteServiceCategoryConfig = fetchConfig({url : deleteServiceCategory, data: {id}, method : 'post'})
      const res = await fetchWrapper(deleteServiceCategoryConfig)
      
      if (res.status === 200) {
        this.fetchAllServiceCategories();
        this.setState((state) => ({
          ...state,
          success: { show: true, message: "service category was successfully deleted", delError: false },
        }), () => this.sync());
        
      }
    } catch (error) {
      console.log(error);
      this.setState((state) => ({
        ...state,
        success: { show: true, message: error.response.data.message, delError: true },
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
    const { categories, user } = this.state;
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
              <h4 className="page-title mb-0"> Manage Service Categories</h4>
              <NavLink
                className="btn btn-primary"
                to={
                  user.userType === "Admin"
                    ? "/AdminServiceCategory"
                    : "/LabServiceCategory"
                }
              >
                Create Category
              </NavLink>
            </header>
            <div className="page-content mt-5">
              <TableSize size={this.state.categories.length} heading="Service Categories"/>
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
                            <tr className="">
                              <th>#</th>
                              <th>Category</th>
                              <th>Description</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {categories.map((item, index) => (
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
                                <td>{item.description}</td>

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
                                              ? `/AdminEditServiceCategory/${item.id}`
                                              : `/LabEditServiceCategory/${item.id}`,
                                          state: item,
                                        }}
                                        className="btn btn-sm btn-block text-primary"
                                      >
                                        <span className="btn-icon icofont-edit-alt mr-2" />
                                        Edit
                                      </Link>
                                      <Link
                                        title="Pre-consultation"
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
