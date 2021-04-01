import React, { Component } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateWardUrl } from "../../../api/URLs";
import { PageLoader, TemplateSettings } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";
import {
  isNotEmptyString,
  isValidPositiveInteger,
} from "../../../utils/validationUtils";

export default class EditWard extends Component {
  static contextType = UserContext;
  state = {
    name: "",
    capacity: "",
    description: "",
    chargePerNight: "",
    formDone: true,
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      const {
        name,
        capacity,
        description,
        chargePerNight,
      } = this.props.history.location.state;
      this.setState({ name, capacity, description, chargePerNight });
    } else {
      return this.props.history.push("/AdminDashboard");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidUpdate() {
    const { formDone } = this.state;
    if (this.checkValidity() && !formDone) {
      this.setState((state) => ({ ...state, formDone: true }));
    } else if (!this.checkValidity() && formDone) {
      this.setState((state) => ({ ...state, formDone: false }));
    }
  }

  checkValidity = () => {
    const { name, capacity, description } = this.state;
    return (
      isNotEmptyString(name) &&
      isValidPositiveInteger(capacity) &&
      isNotEmptyString(description)
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      user: { userType },
    } = this.context;
    const nextRoute =
      userType === "Admin" ? "/AdminManageWards" : "/WardManageWards";
    const { name, description, capacity, chargePerNight } = this.state;

    const data = {
      name,
      description,
      capacity: Number(capacity),
      chargePerNight: Number(chargePerNight),
      id: this.props.location.state?.id,
    };

    console.log({ data });
    if (name !== "" && Component !== "" && description !== "") {
      try {
        const updateWard = updateWardUrl();
        const updateWardConfig = fetchConfig({
          url: updateWard,
          data,
          method: "post",
        });
        const res = await fetchWrapper(updateWardConfig);
        notification.success({ message: res.data.message });
        this.props.history.push(nextRoute);
      } catch (error) {
        console.log(error);
        notification.error({ message: error?.response?.data.message });
      }
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
          <div className="main-content-wrap w-75">
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <form
                        className="mb-4 p-5 needs-validation"
                        noValidate
                        onSubmit={this.handleSubmit}
                      >
                        <h4 className="text-center">Edit a Ward</h4>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Name of Ward"
                            value={this.state.name}
                            required
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Please provide a valid name.
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Capacity</label>
                          <input
                            className="form-control"
                            type="number"
                            tabIndex={-98}
                            value={this.state.capacity}
                            onChange={(e) =>
                              this.setState({ capacity: e.target.value })
                            }
                            placeholder="Room capacity"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Oops! should be numbers only.
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Charge per night</label>
                          <input
                            className="form-control"
                            type="number"
                            tabIndex={-98}
                            value={this.state.chargePerNight}
                            onChange={(e) =>
                              this.setState({ chargePerNight: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            value={this.state.description}
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                            placeholder="Ward Description"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Oops! should be numbers only.
                          </div>
                        </div>
                        <div className="row">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={!this.state.formDone}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <TemplateSettings />
      </>
    );
  }
}
