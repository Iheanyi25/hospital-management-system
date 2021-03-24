import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest, fetchWrapper } from "../../../api/fetcher";
import { getAllServicesUrl, createHMOServicePriceUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";

export default function AddServiceToPlan() {
  const {
    push,
    location: { state: healthPlanName },
  } = useHistory();
  const { id: hmoHealthPlanId } = useParams();
  const [price, setPrice] = useState("");
  const [service, setService] = useState();
  const getAllServices = getAllServicesUrl(1, 200);
  const getAllServicesConfig = fetchConfig({
    url: getAllServices,
    method: "get",
  });
  const { data, error } = useRequest(getAllServicesConfig, {
    revalidateOnFocus: false,
  });
  let options = [];
  if (data?.services.length > 0) {
    data.services.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }
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
        push({
          pathname: `/ManageHealthPlanServices/${hmoHealthPlanId}`,
          state: healthPlanName,
        });
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
                        <label>Select Service</label>
                        <Select
                          value={service}
                          isSearchable={true}
                          options={options}
                          onChange={handleChange}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>
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
                          <button type="submit" className="btn btn-primary">
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
