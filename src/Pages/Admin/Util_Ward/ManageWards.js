import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { deleteWardUrl, getAllWardsUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import TableSize from "../../../Components/DataTable/TableSize";
import { notification } from "../../../utils/notification";

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageWards extends Component {
  state = {
    wards: []
  };

  async componentDidMount() {
    this.fetchAllWards();
  }

  fetchAllWards = async () => {
   try {
    const getAllWards = getAllWardsUrl();
    const getAllWardsConfig = fetchConfig({ url: getAllWards, method: "get" });
    const {data} = await fetchWrapper(getAllWardsConfig);

    this.$el = $(this.el);
    this.$el.DataTable().destroy();
    this.setState(
      (state) => ({ ...state, wards: data.wards }),
      () => this.sync()
    );
   } catch (error) {
       console.log(error)
   }
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  deleteMe = async (id) => {
    try {
        const deleteWard = deleteWardUrl();
        const deleteWardConfig = fetchConfig({
          url: deleteWard,
          data: { id },
          method: "post",
        });
        const res = await fetchWrapper(deleteWardConfig);
        notification.success({ message: res.data.message})
        await this.fetchAllWards();
    } catch (error) {
        console.log(error)
        notification.error({ message: error?.response?.data.message })
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
          <div className="main-content-wrap">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title mb-0"> Manage Wards</h4>
              <NavLink className="btn btn-primary" to="/AdminCreateWard">
                Create Wards
              </NavLink>
            </header>

            <div className="page-content mt-5">
              <TableSize size={this.state.wards.length} heading="No Of Wards" />
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
                        >
                          <thead>
                            <tr className="">
                              <th>#</th>
                              <th>Name</th>
                              <th>Capacity</th>
                              <th>Description</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.wards.map((item, index) => (
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
                                <td>{item.capacity}</td>
                                <td>{item?.description}</td>

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
                                          pathname: "/AdminEditWard/" + item.id,
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
