import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest, fetchWrapper } from "../../../api/fetcher";
import {
  createHMOServicePriceUrl,
  getAllServicesCategoryUrl,
  getAllServicesInACategoryUrl,
} from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default function AddServiceToPlan() {
  const {
    goBack,
    location: { state: healthPlanName },
  } = useHistory();
  const { id: hmoHealthPlanId } = useParams();
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [showServices, setShowServices] = useState(false);
  const [serviceOptions, setServiceOptions] = useState();
  const [service, setService] = useState();
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(price)) {
      setEmptyField(false);
    }
  }, [price]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { serviceId: service.value, hmoHealthPlanId, price };
    try {
      const createHMOServicePrice = createHMOServicePriceUrl();
      const createHMOServicePriceConfig = fetchConfig({
        url: createHMOServicePrice,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createHMOServicePriceConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        goBack({ state: healthPlanName });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
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
            <h4 className="page-title mb-0">{`Add Service To ${healthPlanName}`}</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Add Service</h4>
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
                        <label>Amount</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          onChange={(e) => setPrice(e.target.value)}
                          required
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
                            Add to health plan
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
