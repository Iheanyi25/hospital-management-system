import React, { Component } from "react";
import { PageLoader } from "../../Components";
import SelectFamily from "./SelectFamily";
import { Success } from "../../Components/Alerts";
import { isNotEmptyString, isValidEmail } from "../../utils/validationUtils";
import { getAllHealthPlansUrl, registerPatientUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

export default class AddPatient extends Component {
  state = {
    healthPlans: [],
    stage: 0,
    firstName: "",
    lastName: "",
    email: "",
    healthPlan: "",
    healthPlanId: "",
    patientId: "",
    accountId: "",
    message: "",
    isDisabled: true,
    success: false,
    isSubmitting: false
  };

  componentDidMount() {
    this.fetchHealthPlans();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.verifyValidity() && !prevState.isDisabled) {
      this.setState((state) => ({ ...state, isDisabled: true }));
    } else if (this.verifyValidity() && prevState.isDisabled) {
      this.setState((state) => ({ ...state, isDisabled: false }));
    }
    //    else {
    //     this.setState((state) => ({...state, isDisabled: false }));
    // }
  }
  fetchHealthPlans = async () => {
    try {
      const getAllHealthPlans = getAllHealthPlansUrl();
      const getAllHealthPlansConfig = fetchConfig({ url: getAllHealthPlans, method: "get", });
      const { data } = await fetchWrapper(getAllHealthPlansConfig);

      this.setState({ healthPlans: data.plans });
    } catch (error) { }
  };

  handleChange(name, e) {
    const value = e.target.value;

    if (name === "healthPlan") {
      let healthPlanDetails = e.target.value.split("#");
          this.setState({ healthPlanId: healthPlanDetails[1] });
    }


    this.setState({
      [name]: value,
    });
  }

  verifyValidity = () => {
    const { firstName, lastName, email, healthPlan } = this.state;
    return (
      isNotEmptyString(firstName) &&
      isNotEmptyString(lastName) &&
      isNotEmptyString(email) &&
      isNotEmptyString(healthPlan) &&
      isValidEmail(email)
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      healthPlanId,
      healthPlan,
      stage,
    } = this.state;

    let data = { firstName, lastName, email, healthPlanId };
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      healthPlanId !== ""
    ) {

      if (healthPlan.includes("family")) {
        this.setNewStage(stage + 1);
      } else {
        await this.submit(data);
      }
    }
  };

  submit = async (data) => {
    this.setState({ isSubmitting: true })

    try {
      const registerPatient = registerPatientUrl()
      const registerPatientConfig = fetchConfig({ url: registerPatient, data: data, method: 'post' })
      const res = await fetchWrapper(registerPatientConfig)

      if (res.status === 200) {
        this.setState({ success: true, patientId: res.data.patient.id, message: res.data.message });
      }
      this.setState({ isSubmitting: false })
    } catch (error) {
      this.setState({ isSubmitting: false })
      console.log(error);
    }
  };

  setNewStage = (stage) => {
    this.setState({ stage });
  };

  render() {
    const { email, firstName, lastName, healthPlan, healthPlanId } = this.state;
    let data = { firstName, lastName, email, healthPlanId };

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
              message={this.state.message}
              nextRoute={"/AdminUpdatePatientProfile/" + this.state.patientId}
            />
          ) : null}
          <div className="main-content-wrap w-75">
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  {this.state.stage === 0 ? (
                    <div className="card border-light">
                      <div className="card-body">
                        <form
                          className="mb-4 p-5 needs-validation"
                          onSubmit={this.handleSubmit}
                          noValidate
                        >
                          <h4 className="text-center">Register new patient</h4>
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              className="form-control"
                              value={firstName}
                              onChange={(e) =>
                                this.handleChange("firstName", e)
                              }
                              type="text"
                              placeholder="First Name"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please provide a valid name.
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              className="form-control"
                              value={lastName}
                              onChange={(e) => this.handleChange("lastName", e)}
                              type="text"
                              required
                              placeholder="Last Name"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please provide a valid name.
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              className="form-control"
                              value={email}
                              onChange={(e) => this.handleChange("email", e)}
                              type="email"
                              required
                              placeholder="Email"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please provide a valid email.
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Health Plan</label>
                            <select
                              className="form-control"
                              value={healthPlan}
                              required
                              onChange={(e) =>
                                this.handleChange("healthPlan", e)
                              }
                            >
                              <option value="" selected="true" disabled>
                                {this.state.healthPlans.length > 0
                                  ? "Select health plan"
                                  : "Loading..."}{" "}
                                {/** added loading state to the form */}
                              </option>
                              {this.state.healthPlans.length > 0 &&
                                this.state.healthPlans.map(
                                  (healthPlan, index) => (
                                    <option
                                      key={index}
                                      value={`${healthPlan.name.toLowerCase()}#${healthPlan.id
                                        }`}
                                    >
                                      {healthPlan.name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                          <div className="row">
                            <div className="col"></div>
                            <div className="col text-right">
                              <button type="submit" className="btn btn-primary" disabled={this.state.isDisabled}>
                                Register Patient
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : this.state.stage === 1 ? (
                    <SelectFamily
                      healthPlanId={this.state.healthPlanId}
                      currentStage={this.state.stage}
                      stageSetter={this.setNewStage}
                      payload={data}
                      submitFunction={this.submit}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

