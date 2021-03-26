import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getHMOHealthPlansUrl,
  updateHMOSubUserGroupUrl,
} from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { isNotEmptyString } from "../../../utils/validationUtils";
import { notification } from "../../../utils/notification";

export default function EditUserSubGroup() {
  const { hmoId } = useContext(UserContext);
  const {
    push,
    location: { state },
  } = useHistory();
  const [healthPlan, setHealthPlan] = useState();
  const [details, setDetails] = useState({
    name: state?.name || "",
    description: state?.description || "",
    hmoHealthPlanId: "Nothing passed yet",
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(details.name)) {
      setEmptyField(false);
    }
  }, [details.name]);

  // fetching the health plans
  const getHMOHealthPlans = getHMOHealthPlansUrl(hmoId, 1, 200);
  const getHMOHealthPlansConfig = fetchConfig({
    url: getHMOHealthPlans,
    method: "get",
  });
  const { data, error } = useRequest(getHMOHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  let options = [];
  if (data?.hmoHealthPlans.length > 0) {
    data.hmoHealthPlans.forEach(({ name, id }) => {
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
    setHealthPlan(healthPlan);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...details,
      id: state?.id,
      hmoUserGroupId: state?.hmoUserGroupId,
      hmoHealthPlanId: healthPlan.value,
    };
    try {
      const updateHMOSubUserGroup = updateHMOSubUserGroupUrl();
      const updateHMOSubUserGroupConfig = fetchConfig({
        url: updateHMOSubUserGroup,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(updateHMOSubUserGroupConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        push({
          pathname: `/ManageUserSubGroups/${state?.hmoUserGroupId}`,
          state: state?.name,
        });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(data);
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
            <h4 className="page-title mb-0">{`Update Sub Group ${state?.name}`}</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Update Sub Group</h4>
                      <div className="form-group">
                        <label>Sub group Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          name="name"
                          value={details.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="description"
                          value={details.description}
                          onChange={handleChange}
                          tabIndex={-98}
                        />
                      </div>
                      <div className="form-group">
                        <label>Select a health plan</label>
                        <Select
                          value={healthPlan}
                          isSearchable={true}
                          options={options}
                          onChange={handleSelect}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
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
                            Update
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
