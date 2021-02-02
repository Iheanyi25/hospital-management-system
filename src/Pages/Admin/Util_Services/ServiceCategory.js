import { observer } from "mobx-react";
import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { postServiceCategoryUrl } from "../../../api/URLs";
import { PageLoader, TemplateSettings } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";
import { isNotEmptyString, isValidPositiveInteger } from "../../../utils/validationUtils";

class ServiceCategory extends React.Component {
  static contextType = UserContext;
  state = {
    name: "",
    description: "",
    formDone: false
  };

  componentDidUpdate() {
    const { formDone } = this.state;
    if ( this.checkValidity() && !formDone) {
      this.setState((state) => ({ ...state, formDone: true }));
    }
    else if(!this.checkValidity() && formDone){
      this.setState((state) => ({ ...state, formDone: false }));
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user: { userType }} = this.context
    const data = {
      name: this.state.name,
      description: this.state.description,
    };
    if (this.state.name !== "" && this.state.description !== "") {
      try {
        const postServiceCategory = postServiceCategoryUrl();
        const postServiceCategoryConfig = fetchConfig({ url: postServiceCategory, data, method: "post" });
        const res = await fetchWrapper(postServiceCategoryConfig);
        const nextRoute= userType === "Admin" ? "/AdminManageServiceCategory" : "/LabManageServiceCategory";
        notification.success({ message: res.data.message})
        this.props.history.push(nextRoute);
      } catch (error) {
        console.log(error);
        notification.error({ message: error?.response?.data.message })
      }
    }
  };

   checkValidity = () => {
    const { name, description } = this.state;
    return isNotEmptyString(name) && isNotEmptyString(description);
  }

  render() {
    const { formDone } = this.state;
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

        <TemplateSettings />
      </>
    );
  }
}

export default observer(ServiceCategory);
