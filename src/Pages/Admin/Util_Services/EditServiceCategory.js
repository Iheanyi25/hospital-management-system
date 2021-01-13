import React, { Component } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateServiceCategoryUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { Success } from "../../../Components/Alerts";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default class EditServiceCategory extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("authenticatedUser")),
    name: "",
    description: "",
    formDone: true
  };

  async componentDidMount() {
    if (this.props.history.location.state) {
      let stateData = this.props.history.location.state;
      this.setState({
        name: stateData.name,
        description: stateData.description,
      });
    } else {
      return this.props.history.push("/AdminDashboard");
    }
  }

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
    const { name, description } = this.state;
    return isNotEmptyString(name) && isNotEmptyString(description);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      id: this.props.location.state?.id,
    };

    console.log({ data });
    if (this.state.name !== "" && this.state.description !== "") {
      try {
        const updateServiceCategory = updateServiceCategoryUrl()
        const updateServiceCategoryConfig = fetchConfig({url : updateServiceCategory, data, method : 'post'})
        const res = await fetchWrapper(updateServiceCategoryConfig)

        if (res.status === 200) {
          this.setState({ success: true });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { success, name, description, user, formDone } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {success ? (
            <Success
              history={this.props.history}
              message="Well done, you successfully updated a category"
              nextRoute={
                user.userType === "Admin"
                  ? "/AdminManageServiceCategory"
                  : "/LabManageServiceCategory"
              }
            />
          ) : null}
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
                        <h4 className="text-center">Edit Service Category</h4>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Name"
                            value={name}
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
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            rows={3}
                            value={description}
                            required
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Please provide a valid description.
                          </div>
                        </div>
                        <div className="row">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button type="submit" className="btn btn-primary" disabled={!formDone}>
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
