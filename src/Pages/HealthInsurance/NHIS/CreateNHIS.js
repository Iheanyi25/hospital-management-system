import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getAllActiveHealthPlansUrl,
  createNHISHealthPlanUrl,
} from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default function CreateInsurance() {
  const [payload, setPayload] = useState({
    name: "",
    percentage: "",
    amount: "",
    description: "",
    requireAuthorizationCode: false,
    healthPlan: null,
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { name, percentage, amount, healthPlan } = payload;
    if (
      isNotEmptyString(name) &&
      isNotEmptyString(percentage) &&
      isNotEmptyString(amount) &&
      isNotEmptyString(healthPlan)
    ) {
      setEmptyField(false);
    }
  }, [payload]);
  const history = useHistory();
  const getAllHealthPlans = getAllActiveHealthPlansUrl(1, 200);
  const getAllHealthPlansConfig = fetchConfig({
    url: getAllHealthPlans,
    method: "get",
  });
  const { data, error } = useRequest(getAllHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  const options = [];

  if (data?.healthPlans.length > 0) {
    data.plans.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }
  const handleChange = (e) => {
    if (e.target.checked) {
      setPayload({ ...payload, requireAuthorizationCode: e.target.checked });
    } else {
      setPayload({
        ...payload,
        [e.target.name]: e.target.value,
      });
    }
    console.log(payload);
  };
  const handleSelect = (healthPlan) => {
    console.log(healthPlan);
    setPayload({ ...payload, healthPlan });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      percentage,
      amount,
      description,
      requireAuthorizationCode,
      healthPlan: { value: healthPlanId },
    } = payload;
    const data = {
      name,
      percentage,
      amount,
      description,
      requireAuthorizationCode,
      healthPlanId,
    };
    try {
      const createNHISHealthPlan = createNHISHealthPlanUrl();
      const createNHISHealthPlanConfig = fetchConfig({
        url: createNHISHealthPlan,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(createNHISHealthPlanConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        history.push("/AdminManageNHIS");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(data);
  };
  const { healthPlan } = payload;
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
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Create NHIS Health Plan</h4>
                      <div className="form-group">
                        <label>Plan Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          name="name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Percentage to be paid by patient (%)</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="percentage"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Amount to be paid by Government</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="amount"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Select Health Plan Type</label>
                        <Select
                          value={healthPlan}
                          onChange={handleSelect}
                          isSearchable={true}
                          options={options}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          name="description"
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          onChange={handleChange}
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          for="customCheck1"
                        >
                          Require authorization code
                        </label>
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="submit"
                            disabled={emptyField ? true : false}
                            className="btn btn-primary"
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
