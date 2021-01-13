import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { createServiceUrl, getAllServicesCategoryUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { Success } from "../../../Components/Alerts";
import { UserContext } from "../../../mobx/UserState";
import {
  isNotEmptyString,
  isValidPositiveInteger,
} from "../../../utils/validationUtils";

class CreateService extends React.Component {
  static contextType = UserContext;
  state = {
    categories: [],

    name: "",
    serviceCategoryId: "",
    cost: "",

    success: false,
    formDone: false,
  };

  componentDidMount() {
    this.fetchServiceCategories();
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

  fetchServiceCategories = async () => {
    try {
     
      const getAllServicesCategory = getAllServicesCategoryUrl()
      const getAllServicesCategoryConfig = fetchConfig({url : getAllServicesCategory, method : 'get'})
      const {data} = await fetchWrapper(getAllServicesCategoryConfig)

      this.setState({ categories: data });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      serviceCategoryId: this.state.serviceCategoryId,
      cost: this.state.cost,
    };
    if (
      this.state.name !== "" &&
      this.state.serviceCategoryId !== "" &&
      this.state.cost !== ""
    ) {
      try {
        const createService = createServiceUrl()
        const createServiceConfig = fetchConfig({url : createService, data, method : 'post'})
        const res = await fetchWrapper(createServiceConfig)
        if (res.status === 200) {
          this.setState({ success: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  checkValidity = () => {
    const { name, cost, serviceCategoryId } = this.state;
    return (
      isNotEmptyString(name) &&
      isNotEmptyString(serviceCategoryId) &&
      isValidPositiveInteger(cost)
    );
  };

  render() {
    const content = this.context;
    const { user } = content;
    const { success, categories, formDone } = this.state;
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
              message="Well done, you successfully created a category"
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
                        onSubmit={this.handleSubmit}
                        noValidate
                      >
                        <h4 className="text-center">Create a service</h4>
                        <div className="form-group">
                          <label>Title</label>

                          <input
                            className="form-control"
                            type="text"
                            tabIndex={-98}
                            placeholder="Name of service"
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
                            {categories.length > 0 &&
                              categories.map((category, i) => (
                                <option key={i} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Cost</label>{" "}
                          <input
                            className="form-control"
                            type="number"
                            tabIndex={-98}
                            placeholder="Price of Service"
                            name="cost"
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
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={formDone ? false : true}
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
      </>
    );
  }
}

export default CreateService;
