import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { getAllHealthPlansUrl, createHMOUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString, isValidEmail } from "../../../utils/validationUtils";

export default function CreateHMO() {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    roleName: "HMOAdmin",
    email: "",
    name: "",
    description: "",
    healthPlan: null,
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { firstName, lastName, name, email } = details;
    if (
      isNotEmptyString(firstName) &&
      isNotEmptyString(lastName) &&
      isNotEmptyString(name) &&
      isValidEmail(email)
    ) {
      setEmptyField(false);
    }
  }, [details]);
  const history = useHistory();
  const getAllHealthPlans = getAllHealthPlansUrl(1, 200);
  const getAllHealthPlansConfig = fetchConfig({
    url: getAllHealthPlans,
    method: "get",
  });
  const { data, error } = useRequest(getAllHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  const options = [];

  if (data?.healthPlans.length > 0) {
    data.healthPlans.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (healthPlan) => {
    console.log(healthPlan);
    setDetails({ ...details, healthPlan });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      name,
      email,
      roleName,
      description,
      healthPlan: { value: healthPlanId },
    } = details;
    const payload = {
      firstName,
      lastName,
      name,
      email,
      roleName,
      description,
      healthPlanId,
    };
    try {
      const createHMO = createHMOUrl();
      const createHMOConfig = fetchConfig({
        url: createHMO,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createHMOConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        history.push("/AdminManageHMO");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };
  const { healthPlan } = details;
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
                      <h4 className="text-center">Create HMO Account</h4>
                      <div className="form-group">
                        <label>HMO Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          name="name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>User's first name</label>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>User's last name</label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Account Email</label>
                        <input
                          className="form-control"
                          type="email"
                          tabIndex={-98}
                          name="email"
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
                          className="form-control"
                          type="text"
                          name="description"
                          onChange={handleChange}
                          tabIndex={-98}
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
                            Create Account
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
