import React, { Component } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { createWardUrl } from "../../../api/URLs";
import { PageLoader } from "../..";
import { notification } from "../../../utils/notification";
import { isNotEmptyString, isValidPositiveInteger } from "../../../utils/validationUtils";

export default class CreateWard extends Component {
  state = {
    name: "",
    capacity: "",
    description: "",
	formDone: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidUpdate() {
    const { formDone } = this.state;
    if ( this.checkValidity() && !formDone) {
      this.setState((state) => ({ ...state, formDone: true }));
    }
    else if(!this.checkValidity() && formDone){
      this.setState((state) => ({ ...state, formDone: false }));
    }
  }

  checkValidity = () => {
    const { name, capacity, description } = this.state
    return (
      isNotEmptyString(name) &&
	  isValidPositiveInteger(capacity) &&
	  isNotEmptyString(description)
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, capacity, description } = this.state;

    const data = {
      name,
      capacity,
      description,
    };

    if (name !== "" && capacity !== "" && description !== "") {
      try {
        const createWard = createWardUrl();
				const createWardConfig = fetchConfig({ url: createWard, data, method: "post" });
				const res = await fetchWrapper(createWardConfig)
        notification.success({ message: res.data.message})
				this.props.history.push("/AdminManageWards")
      } catch (error) {
        console.log(error);
        notification.error({ message: error?.response?.data.message })
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
                        onSubmit={this.handleSubmit}
                        noValidate
                      >
                        <h4 className="text-center">Create a Ward</h4>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Name of Ward"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                [e.target.name]: e.target.value,
                              });
                            }}
                            required
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
                            placeholder="Room capacity"
                            name="capacity"
                            onChange={(e) => {
                              this.setState({
                                [e.target.name]: e.target.value,
                              });
                            }}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Oops! should be numbers only.
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Enter description"
                            name="description"
                            multiple="true"
                            onChange={(e) => {
                              this.setState({
                                [e.target.name]: e.target.value,
                              });
                            }}
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
                            <button type="submit" className="btn btn-primary" disabled={!this.state.formDone}>
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
      </>
    );
  }
}
