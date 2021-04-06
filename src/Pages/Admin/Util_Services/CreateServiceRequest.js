import React, { Component } from "react";
import { observer } from "mobx-react";
import { PageLoader } from "../../../Components";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import {
  getAllServicesCategoryUrl,
  getAllServicesInACategoryUrl,
  getPatientsUrl,
  postRequestServicesUrl,
  postAdmissionsRequestServiceUrl,
} from "../../../api/URLs";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";
import CreateServiceTable from "./components/CreateServiceTable";
import Select from "react-select";

const $ = window.$;
class CreateService extends Component {
  static contextType = UserContext;
  state = {
    categorySelected: false,
    categories: [],
    values: [],
    patients: [],
    services: [],
    rerender: "",
    patient: "",
    description: "",
    showServices: false,
    isFetchingCategories: null,
    isFetchingServicesInCategory: null,
    selectedPatient: { label: "", value: "" },
    selectedCategory: { label: "", value: "" },
    selectedService: { label: "", value: "" },
  };

  componentDidMount() {
    console.log(this.props.location.state, 444);
    if (this?.props?.location?.state) {
      this.setState({
        isFromClarking: true,
        patient: this.props.location.state.patient.id,
      });
    }
    if (this?.props?.admissionId) {
      this.setState({ patient: this.props.admissionId });
    }

    this.fetchServiceCategories();
    this.fetchPatients();
  }

  fetchServiceCategories = async () => {
    const getAllServicesCategory = getAllServicesCategoryUrl(1, 200);
    const getAllServicesCategoryConfig = fetchConfig({
      url: getAllServicesCategory,
      method: "get",
    });
    const { data } = await fetchWrapper(getAllServicesCategoryConfig);
    this.setState({
      categories: data.serviceCategories,
      isFetchingCategories: false,
    });
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
    const getPatients = getPatientsUrl(1, 200);
    const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
    const { data } = await fetchWrapper(getPatientsConfig);
    console.log(data, 2222);

    this.setState({ patients: data.patients }, () => {
      this.renderPicker(".custom-picker");
    });
  };

  fetchServicesInACategory = async (id) => {
    this.setState({ isFetchingServicesInCategory: true });
    const getAllServicesInACategory = getAllServicesInACategoryUrl(id);
    const getAllServicesInACategoryConfig = fetchConfig({
      url: getAllServicesInACategory,
      method: "get",
    });
    const serviceInCatRes = await fetchWrapper(getAllServicesInACategoryConfig);

    this.setState(
      {
        services: serviceInCatRes?.data?.services || [],
        showServices: true,
        isFetchingServicesInCategory: false,
      },
      () => {
        this.renderPicker(".custom-picker-services");
      }
    );
  };

  handleServiceCatSelect = (selectedCat) => {
    this.setState({ selectedCategory: selectedCat, showServices: false });
    this.fetchServicesInACategory(selectedCat?.value);
  };

  handleServiceSelect = (elem) => {
    // e.preventDefault();
    if (this.state.patient) {
      if (elem.value) {
        // variable holders
        let stateValue = this.state.values;
        console.log(stateValue, 999999);
        let existingKey = stateValue.findIndex(
          (element) => element.serviceId === elem.value
        );

        // console.log("check 1", stateValue, e.target.value, existingKey, existingElement);
        if (existingKey < 0) {
          // console.log("check 2: initial load ffor empty stateValue: ");

          let newSelect = {
            serviceId: elem.value,
            service: elem.label,
            category: this.state.selectedCategory,
            // index,
          };
          stateValue.push(newSelect);

          // console.log("check 3: first load ----- final: ", stateValue)
          this.setState({ values: stateValue, selectedService: elem });
          return;
        } else return;
      }
      return;
    } else {
      alert("select a patient");
    }
  };

  handlePatientSelect = (data) => {
    if (data?.value) {
      this.setState({ selectedPatient: data, patient: data.value });
    }
  };

  deleteService = (index) => {
    let serviceRequests = this.state.values;
    serviceRequests.splice(index, 1);
    this.setState({ values: serviceRequests });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.context;
    const { isFromClarking } = this.state;
    try {
      let serviceId = [];
      let generatedBy = user;
      generatedBy = generatedBy.id;

      let payload = {
        generatedBy,
        patientId: this.state.patient,
        description: this.state.description,
        id: "",
        idType: "",
      };

      console.log(payload, 7777);

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
      if (this.props.admissionId) {
        return this.admissionsRequestService(payload.serviceId, generatedBy);
      }
      const postRequestServices = postRequestServicesUrl();
      const postRequestServicesConfig = fetchConfig({
        url: postRequestServices,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(postRequestServicesConfig);

      if (String(res.status).startsWith("2")) {
        const nextRoute = isFromClarking
          ? "/DoctorClarking"
          : user.userType === "Admin"
          ? "/AdminManageServiceRequests"
          : "/LabManageServiceRequests";
        notification.success({ message: res.data.message });
        this.props.history.push({
          pathname: nextRoute,
          state: isFromClarking && this.props.location.state,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  admissionsRequestService = async (serviceId, generatedBy) => {
    const admissionId = this.props.admissionId;
    const nextRoute = `/AdminManageAdmissionInvoices/${admissionId}`;
    console.log(serviceId);
    const payload = {
      serviceId,
      generatedBy,
      admissionId,
    };
    console.log(payload);
    const postRequestServices = postAdmissionsRequestServiceUrl();
    const postRequestServicesConfig = fetchConfig({
      url: postRequestServices,
      data: payload,
      method: "post",
    });
    try {
      const res = await fetchWrapper(postRequestServicesConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        this.props.history.push(nextRoute);
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };
  render() {
    console.log(this.state.patients, 5555);
    const allPatients = [];
    const optionsServiceCat = [];
    const optionsService = [];

    if (this.state.patients.length > 0) {
      this.state.patients.forEach(({ patientId, firstName, lastName }) => {
        allPatients.push({
          value: patientId,
          label: `${firstName} ${lastName}`,
        });
      });
    }

    if (this.state.categories.length > 0) {
      this.state.categories.forEach(({ id, name }) => {
        optionsServiceCat.push({ value: id, label: name });
      });
    }

    if (this.state.services.length > 0) {
      this.state.services.forEach(({ id, name }) => {
        optionsService.push({ value: id, label: name });
      });
    }

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
                        <h4 className="text-center mt-0">
                          Service request form
                        </h4>

                        {!(
                          this.state?.isFromClarking || this.props.admissionId
                        ) ? (
                          <div className="form-group">
                            <label> Select Patient</label>
                            <Select
                              options={allPatients}
                              onChange={this.handlePatientSelect}
                            />
                          </div>
                        ) : null}

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
                        <div className="form-group">
                          <label>Service Categories</label>
                          <Select
                            options={optionsServiceCat}
                            onChange={this.handleServiceCatSelect}
                          />
                        </div>
                        {this.state.showServices ? (
                          <div className="form-group">
                            <label>Services</label>
                            <Select
                              options={optionsService}
                              onChange={this.handleServiceSelect}
                            />
                          </div>
                        ) : null}

                        {/* <MultipleSelect
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
                        /> */}
                      </form>
                    </div>
                  </div>
                </div>

                {/* display service chosen */}
                <div className="col-12 col-md-7">
                  <div className="card border-light">
                    <div className="card-body">
                      <header className="page-header justify-content-between d-flex align-items-center mb-2">
                        <h4 className="page-title"> Selected Services</h4>
                      </header>
                      <CreateServiceTable
                        items={this.state.values}
                        deleteService={this.deleteService}
                      />
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
                              ? "Request for Service"
                              : "Request Service"}
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
