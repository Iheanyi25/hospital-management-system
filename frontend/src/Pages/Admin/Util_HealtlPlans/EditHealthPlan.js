import React, { useEffect, useState, Fragment, useCallback } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateHealthPlanUrl } from "../../../api/URLs";
import { TemplateSettings } from "../../../Components";
import { notification } from "../../../utils/notification";

import {
  isBoolean,
  isNotEmptyString,
  isValidPositiveInteger,
} from "../../../utils/validationUtils";
import EditHealthPlanForm from "./EditHealthPlanForm";

export default function EditHealthPlan(props) {
  const { history } = props;
  const { location } = history;
  const [state, setState] = useState({
    id: location.state.id || "",
    name: location.state.name || "",
    cost: location.state.cost || "",
    renewal: location.state.renewal || "",
    noOfPatients: location.state.noOfPatients || "",
    noOfAccounts: location.state.noOfAccounts || "",
    instantBilling: location.state.instantBilling || false,
  });

  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  if (!location.state) {
    history.push("/AdminManageHealthPlans");
  }

  const memoizedVerifyValidity = useCallback(() => {
    return (
      isNotEmptyString(state.id) &&
      isNotEmptyString(state.name) &&
      isValidPositiveInteger(state.cost) &&
      isValidPositiveInteger(state.renewal) &&
      isValidPositiveInteger(state.noOfPatients) &&
      isValidPositiveInteger(state.noOfAccounts) &&
      isBoolean(state.instantBilling)
    );
  }, [state]);

  useEffect(() => {
    if (!memoizedVerifyValidity()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state, memoizedVerifyValidity]);

  const handleChange = (e) => {
    e.persist();
    if (e.target.name === "instantBilling") {
      setState((state) => ({
        ...state,
        [e.target.name]: !state.instantBilling,
      }));
    } else {
      setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (memoizedVerifyValidity()) {
      try {
        setLoading(true);
        const updateHealthPlan = updateHealthPlanUrl();
        const updateHealthPlanConfig = fetchConfig({
          url: updateHealthPlan,
          method: "post",
          data: state,
        });
        const res = await fetchWrapper(updateHealthPlanConfig);
        if (res.status === 200) {
          notification.success({ message: res.data.message });
          history.push("/AdminManageHealthPlans");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        notification.error({ message: error?.response?.data.message });
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
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
                    <EditHealthPlanForm
                      loading={loading}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      healthPlanData={state}
                      isDisabled={isDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TemplateSettings />
    </Fragment>
  );
}
