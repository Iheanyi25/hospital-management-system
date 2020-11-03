import React, { Component } from "react";
import { PageLoader } from "../../../Components";

export default class CreateServiceRequest extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchServiceCategories();
  }

  fetchServiceCategories = async () => {
    try {
      let res = await fetch(
        "https://hms-tenece.azurewebsites.net/api/Admin/GetAllServiceCategories",
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "GET",
          redirect: "follow",
        }
      );
      const data = await res.text();
      console.log(JSON.parse(data));
      this.setState({ categories: JSON.parse(data) });
    } catch (error) {
      console.log(error);
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
            <div className="page-content">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4 p-5 needs-validation">
                        <h4 className="text-center">Service request form</h4>
                        <div className="form-group">
                          <label>Patient</label>

                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Patient"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Please provide a valid name.
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Service Category</label>
                          <select className="form-control">
                            <option disabled selected="true" value="">
                              {this.state.categories.length > 0
                                ? "Select service category"
                                : "Loading..."}{" "}
                              {/** added loading state to the form */}
                            </option>
                            {this.state.categories.length > 0 &&
                              this.state.categories.map((category, i) => (
                                <option key={i} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* display service chosen */}
                <div className="col-12 col-md-7">
                  <div className="card border-light">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr className="">
                              <th>#</th>
                              <th>Service</th>
                              <th>Category</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {/* <tr>
                              <td>
                                <strong>1</strong>
                              </td>
                              <td>
                                <strong>
                                  <div className="d-flex align-items-center nowrap">
                                    Checkup
                                  </div>
                                </strong>
                              </td>
                              <td>Laboratory</td>
                              <td>
                                <div className="d-flex align-items-center nowrap">
                                  <Link
                                    title="Delete"
                                    to="#"
                                    className="text-danger mr-4"
                                  >
                                    <span className="btn-icon icofont-delete-alt" />
                                  </Link>
                                </div>
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                        <p className="w-50 mt-4 text-secondary">
                          You can always change the service category, if you
                          want to add different services from different
                          categories
                        </p>
                      </div>
                      <div className="row mt-5">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Request service
                          </button>
                        </div>
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
