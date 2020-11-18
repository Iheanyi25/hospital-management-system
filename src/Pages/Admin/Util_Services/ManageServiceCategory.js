import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageServiceCategory extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    this.fetchAllServiceCategories().then(() => this.sync())
  }

  fetchAllServiceCategories = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}/Admin/GetAllServiceCategories`
    );
    let data = await request.json();
    console.log(data);
    this.setState({ categories: data });
  }

  deleteMe = async (id) => {
    let res = await fetch(`${process.env.REACT_APP_API_URL}/Admin/DeleteServiceCategory`, {
      headers: { "Content-Type": "application/json-patch+json" },
      method: "POST",
      body: JSON.stringify({ id }),
      redirect: "follow",
    });
    if (res.status === 200) {
      this.setState({ success: true }, () => {
        this.fetchAllServiceCategories();
      });
    }
  }


  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title mb-0"> Manage Service Categories</h4>
              <NavLink className="btn btn-primary" to="/AdminServiceCategory">
                Create Category
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
                          data-columns='[
                                                        { "data": "#" },
                                                        { "data": "name" },
                                                        { "data": "description" },
                                                        { "data": "" }
                                                    ]'
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
                            {this.state.categories.map((item, index) => (
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
                                          pathname: `/AdminEditServiceCategory/${item.id}`,
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
