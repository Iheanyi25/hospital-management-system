import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getAllServicesCategoryUrl,
  getAllServicesInACategoryUrl,
  requestSecondaryServiceUrl,
} from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default function RequestSecondaryService() {
  const {
    push,
    location: { state },
  } = useHistory();
  console.log(state);
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [emptyField, setEmptyField] = useState(true);
  const [category, setCategory] = useState();
  const [showServices, setShowServices] = useState(false);
  const [serviceOptions, setServiceOptions] = useState();
  const [service, setService] = useState();

  // fetch categories
  const getAllServicesCategory = getAllServicesCategoryUrl(1, 200);
  const getAllServicesCategoryConfig = fetchConfig({
    url: getAllServicesCategory,
    method: "get",
  });
  const { data: categories, error } = useRequest(getAllServicesCategoryConfig, {
    revalidateOnFocus: false,
  });
  let categoryOptions = [];
  if (categories?.serviceCategories.length > 0) {
    categories.serviceCategories.forEach(({ id, name }) => {
      categoryOptions.push({ value: id, label: name });
    });
  }
  // fetch services
  const fetchServices = async (category) => {
    setShowServices(false);
    setCategory(category);
    const getAllServicesInACategory = getAllServicesInACategoryUrl(
      category.value
    );
    const getAllServicesInACategoryConfig = fetchConfig({
      url: getAllServicesInACategory,
      method: "get",
    });
    try {
      const { data } = await fetchWrapper(getAllServicesInACategoryConfig);
      let serviceOptions = [];
      if (data?.services.length > 0) {
        data.services.forEach(({ id, name }) => {
          serviceOptions.push({ value: id, label: name });
        });
      }
      setServiceOptions(serviceOptions);
      setShowServices(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (service) => {
    setService(service);
  };
  useEffect(() => {
    if (isNotEmptyString(authorizationCode)) {
      setEmptyField(false);
    }
  }, [authorizationCode]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      patientId: state?.patientId,
      authorizationCode,
      serviceId: service.value,
    };
    console.log(payload);
    try {
      const assignPatientToNHISHealthPlan = requestSecondaryServiceUrl();
      const assignPatientToNHISHealthPlanConfig = fetchConfig({
        url: assignPatientToNHISHealthPlan,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(assignPatientToNHISHealthPlanConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        push({
          pathname: `/AdminManageNHISPatients/${state?.healthPlanId}`,
          state: state?.healthPlanName,
        });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Request Secondary Service</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Request</h4>
                      <div className="form-group">
                        <label>Patient Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          value={state?.patientName}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Select a Service Category</label>
                        <Select
                          value={category}
                          isSearchable={true}
                          options={categoryOptions}
                          onChange={fetchServices}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>
                      {showServices ? (
                        <div className="form-group">
                          <label>Select a Service</label>
                          <Select
                            value={service}
                            isSearchable={true}
                            options={serviceOptions}
                            onChange={handleChange}
                            placeholder="Search"
                          />
                        </div>
                      ) : null}
                      <div className="form-group">
                        <label>Authorization code</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setAuthorizationCode(e.target.value)}
                          tabIndex={-98}
                        />
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="submit"
                            disabled={emptyField ? true : false}
                            className="btn btn-primary"
                          >
                            Request
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
