import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Success } from "../../../Components/Alerts";
import { observer } from "mobx-react";
import {
  MultipleSelect,
  PageLoader,
  SelectableDropDown,
} from "../../../Components";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { getAllServicesCategoryUrl, getAllServicesInACategoryUrl, getPatientsUrl, postRequestServicesUrl } from "../../../api/URLs";
import { UserContext } from "../../../mobx/UserState";

const $ = window.$;

let selectBasic = Math.random();
selectBasic = selectBasic.toString().replace(".", "_");

class CreateService extends Component {
  static contextType = UserContext;
  state = {
    categorySelected: false,
    categories: [],
    values: [],
    patients: [],
    services: [],
    category: "",
    rerender: "",
    patient: "",
    description: "",
    showServices: false,
    success: false,
    isFetchingCategories: null,
    isFetchingServicesInCategory: null,
  };

  componentDidMount() {
    // console.log(this.props.location.state);
    if (this.props.location.state) {
      this.setState({
        isFromClarking: true,
        patient: this.props.location.state.patient.id,
      });
    }

    this.fetchServiceCategories();
    this.fetchPatients();
  }

  fetchServiceCategories = async () => {
    const getAllServicesCategory = getAllServicesCategoryUrl()
    const getAllServicesCategoryConfig = fetchConfig({ url: getAllServicesCategory, method: 'get' })
    const { data } = await fetchWrapper(getAllServicesCategoryConfig)
    console.log(data, 11111)
    this.setState({ categories: data, isFetchingCategories: false });
  };

  renderPicker(customClass) {
    var select = $(customClass);

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  }

  fetchPatients = async () => {
    const getPatients = getPatientsUrl()
    const getPatientsConfig = fetchConfig({ url: getPatients, method: 'get' })
    const { data } = await fetchWrapper(getPatientsConfig)
    console.log(data, 2222)
    const patientArray = [];

    data.patients.forEach((element) => {
      patientArray.push(element.patient);
    });

    this.setState({ patients: patientArray }, () => {
      this.renderPicker(".custom-picker");
    });
  };

  fetchServicesInACategory = async (id) => {
    this.setState({ isFetchingServicesInCategory: true });
    const getAllServicesInACategory = getAllServicesInACategoryUrl(id)
    const getAllServicesInACategoryConfig = fetchConfig({ url: getAllServicesInACategory, method: 'get' })
    const { data } = await fetchWrapper(getAllServicesInACategoryConfig)

    console.log(data, 99999999)
    this.setState({ services: data, showServices: true, isFetchingServicesInCategory: false }, () => {
      this.renderPicker(".custom-picker-services");
    });
  };

  handleSelect = (elem, e) => {
    e.preventDefault();
    if (this.state.patient) {
      if (e.target.value) {
        let valueContainer = document.getElementsByClassName(
          "filter-option-inner-inner"
        )[1];

        let values = valueContainer.innerText.split(",");
        let valueToPush = [];
        let stateValue = this.state.values;

        return values.map((item, index) => {
          if (stateValue.length > 0) {
            return stateValue.forEach((element) => {
              if (
                element.serviceId === e.target.value ||
                element.service === item
              )
                return;
              else {
                let newSelect = {
                  serviceId: e.target.value,
                  service: item,
                  category: this.state.category,
                  index,
                };
                valueToPush.push(newSelect);
                console.log("the values to  be pushed: 1", valueToPush);
                this.setState({
                  values: [...this.state.values, ...valueToPush],
                });
                return;
              }
            });
          } else {
            let newSelect = {
              serviceId: e.target.value,
              service: item,
              category: this.state.category,
              index,
            };
            valueToPush.push(newSelect);

            this.setState({ values: valueToPush });
            return;
          }
        });
      }
      return;
    } else {
      alert("select a patient");
    }
  };

  handleChange = (name, e) => {
    let value = e.target.value;
    if (name) {
      this.setState({ [name]: value }, () => console.log(this.state));
    } else {
      console.log(name, value);
      let fullData = value.split("#");
      this.setState({ category: fullData[0], showServices: false });
      console.log(fullData[1]);
      this.fetchServicesInACategory(fullData[1]);
    }
  };

  deleteService = (index) => {
    let serviceRequests = this.state.values;
    serviceRequests.splice(index, 1);
    this.setState({ values: serviceRequests });
  };

  handleSubmit = async () => {
    let serviceId = [];
    let generatedBy = JSON.parse(localStorage.getItem("authenticatedUser"));
    generatedBy = generatedBy.id;

    let payload = {
      generatedBy,
      patientId: this.state.patient,
      description: this.state.description,
      id: "",
      idType: "",
    };

    this.state.values.forEach((element) => {
      serviceId.push(element.serviceId);
    });

    if (this.state.isFromClarking) {
      payload = {
        ...payload,
        idType: this.props.location.state.type,
        id: this.props.location.state.id,
      };
    }

    console.log(payload);

    payload.serviceId = serviceId;
    const postRequestServices = postRequestServicesUrl()
    const postRequestServicesConfig = fetchConfig({ url: postRequestServices, data: payload, method: 'post' })
    const res = await fetchWrapper(postRequestServicesConfig)

    if (String(res.status).startsWith("2")) {
      this.setState({ success: true });
    }
  };
  render() {
    const { isFromClarking } = this.state;
    const {user} = this.context;
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
              message="Well done, you successfully requested this service"
              nextRoute={
                isFromClarking
                  ? "/DoctorClarking"
                  : user.userType === "Admin"
                    ? "/AdminManageServiceRequests"
                    : "/LabManageServiceRequests"
              }
              state={isFromClarking ? this.props.location.state : null}
            />
          ) : null}

          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4 p-5 needs-validation">
                        <h4 className="text-center mt-0">
                          Service request form
                        </h4>

                        {!this.state?.isFromClarking ? (
                          <SelectableDropDown
                            itemKey={["id"]}
                            onChange={this.handleChange}
                            stateValue={this.state.patient}
                            stateKey={"patient"}
                            label={"Patient"}
                            data={this.state.patients}
                            search
                            valueKeys={["firstName", "lastName"]}
                          />
                        ) : null}

                        <SelectableDropDown
                          itemKey={["name", "id"]}
                          onChange={this.handleChange}
                          stateValue={this.state.category}
                          stateKey={null}
                          label={"Service Category"}
                          data={this.state.categories}
                          valueKeys={["name"]}
                          isFetchingCategories={this.state.isFetchingCategories}
                        />

                        <div className="form-group">
                          <label>
                            Comment / Description <span>(Optional)</span>
                          </label>
                          <textarea
                            placeholder="Enter comments"
                            defaultValue={this.state.description}
                            className="form-control"
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </div>

                        <MultipleSelect
                          data={this.state.services}
                          showServices={this.state.showServices}
                          itemKey={"id"}
                          onChange={this.handleSelect}
                          label={"Services"}
                          valueKey={"name"}
                          notAvailableText={
                            "Please select a category to continue"
                          }
                          isFetchingServicesInCategory={this.state.isFetchingServicesInCategory}
                        />
                      </form>
                    </div>
                  </div>
                </div>

                {/* display service chosen */}
                <div className="col-12 col-md-7">
                  <div className="card border-light">
                    <div className="card-body">
                      <header className="page-header justify-content-between d-flex align-items-center mb-2">
                        <h4 className="page-title"> Selected services</h4>
                      </header>
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
                            {this.state.values.length > 0 ? (
                              this.state.values.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <strong>{index + 1}</strong>
                                  </td>
                                  <td>
                                    <strong>
                                      <div className="d-flex align-items-center nowrap">
                                        {item.service}
                                      </div>
                                    </strong>
                                  </td>
                                  <td>{item.category}</td>
                                  <td>
                                    <div className="d-flex align-items-center nowrap">
                                      <Link
                                        title="Delete"
                                        to="#"
                                        onClick={() =>
                                          this.deleteService(index)
                                        }
                                        className="text-danger mr-4"
                                      >
                                        <span className="btn-icon icofont-delete-alt" />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                                <tr>
                                  <td colSpan="4">
                                    <p className="w-50 text-secondary">
                                      You can always change the service category,
                                      if you want to add different services from
                                      different categories
                                  </p>
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>
                      </div>
                      <div className="row mt-5">
                        <div className="col">
                          {this.state.isFromClarking ? (
                            <button
                              onClick={() => this.props.history.goBack()}
                              className="btn btn-secondary"
                            >
                              Go back to Clarking
                            </button>
                          ) : null}
                        </div>
                        <div className="col text-right">
                          <button
                            onClick={this.handleSubmit}
                            className="btn btn-primary"
                            disabled={this.state.values.length === 0}
                          >
                            {this.state.isFromClarking
                              ? "Request for service"
                              : "Request service"}
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

const CreateServiceRequest = observer(CreateService);
export default CreateServiceRequest;
