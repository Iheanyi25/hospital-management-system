import { observer } from "mobx-react";
import React, { Component } from "react";
import { Success } from "../../../Components/Alerts";
import { UserContext } from "../../../mobx/UserState";

const apiUrl = process.env.REACT_APP_API_URL;
class EditService extends Component {
  static contextType = UserContext;
  state = {
    name: "",
    cost: "",
    categories: [],
    serviceCategoryId: "",
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      console.log(this.props.history.location.state);
      const {
        history: { location },
      } = this.props;
      const { name, cost } = location.state;

      this.setState({ name: name, cost: cost }, () => {
        this.fetchServiceCategories();
      });
    } else {
      return this.props.history.push("/AdminDashboard");
    }
  }

  fetchServiceCategories = async () => {
    try {
      let res = await fetch(`${apiUrl}/Admin/GetAllServiceCategories`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "GET",
        redirect: "follow",
      });
      const data = await res.text();
      // console.log(JSON.parse(data));
      this.setState({ categories: JSON.parse(data) });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      serviceCategoryId: this.state.serviceCategoryId,
      cost: Number(this.state.cost),
      id: this.props.location.state?.id,
    };

    console.log({ data });
    if (
      this.state.name !== "" &&
      this.state.serviceCategoryId !== "" &&
      this.state.cost !== ""
    ) {
      try {
        let res = await fetch(`${apiUrl}/Admin/UpdateService`, {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify(data),
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
    const content = this.context;
    const { user } = content;
    console.log(this.state);
    return (
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        {this.state.success ? (
          <Success
            history={this.props.history}
            message="Well done, you successfully updated a category"
            nextRoute={
              user.userType === "Admin"
                ? "/AdminManageServices"
                : "/LabManageServices"
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
                      <h4 className="text-center">Edit service</h4>
                      <div className="form-group">
                        <label>Title</label>

                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          placeholder="Name of service"
                          value={this.state.name}
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
                        <label>Category</label>

                        <select
                          className="form-control"
                          name="serviceCategoryId"
                          onChange={(e) => {
                            this.setState({
                              [e.target.name]: e.target.value,
                            });
                          }}
                        >
                          <option>Select a category</option>
                          {this.state.categories.length > 0 &&
                            this.state.categories.map((category, i) => (
                              <option key={i} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">
                          Please provide a valid name.
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Cost</label>{" "}
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          value={this.state.cost}
                          placeholder="Price of Service"
                          onChange={(e) =>
                            this.setState({ cost: e.target.value })
                          }
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">
                          Oops! should be numbers only.
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
    );
  }
}

export default observer(EditService);
