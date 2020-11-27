import React from "react";
import { PageLoader, TemplateSettings } from "../../../Components";
import { Success } from "../../../Components/Alerts";

const apiUrl = process.env.REACT_APP_API_URL;

class ServiceCategory extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("authenticatedUser")),
    name: "",
    description: "",

    success: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
    };
    if (this.state.name !== "" && this.state.description !== "") {
      try {
        let res = await fetch(`${apiUrl}/Admin/CreateServiceCategory`, {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify(data),
          redirect: "follow",
        });
        if (res.status === 200) {
          this.setState({ success: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success ? (
            <Success
              history={this.props.history}
              message="Well done, you successfully created a category"
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
                        onSubmit={this.handleSubmit}
                        noValidate
                      >
                        <h4 className="text-center">Service Category</h4>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Name"
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
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            rows={3}
                            name="description"
                            onChange={(e) => {
                              this.setState({
                                [e.target.name]: e.target.value,
                              });
                            }}
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Please provide a valid description.
                          </div>
                        </div>
                        <div className="row">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button type="submit" className="btn btn-primary">
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

export default ServiceCategory;
