import React, { useEffect, useState, Fragment, useRef, Suspense } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateHealthPlanUrl } from "../../../api/URLs";
import { TemplateSettings } from "../../../Components";
import { Success } from "../../../Components/Alerts";
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

  const [success, setSucces] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  if (!location.state) {
    history.push("/AdminManageHealthPlans");
  }

  useEffect(() => {
    if (!verifyValidity()) {
      setDisabled(true);
    } else {
      setDisabled(false);
	}
  }, [state]);

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

    if (verifyValidity()) {
      try {
		setLoading(true);
        const updateHealthPlan = updateHealthPlanUrl();
        const updateHealthPlanConfig = fetchConfig({
          url: updateHealthPlan,
          method: "post",
          data: state,
        });
        const res = await fetchWrapper(updateHealthPlanConfig);
		if(res.status === 200) {
			setSucces({ show: true, message: "updated Health Plan" });
			setLoading(false);
		}
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const verifyValidity = () => {
    return (
      isNotEmptyString(state.id) &&
      isNotEmptyString(state.name) &&
      isValidPositiveInteger(state.cost) &&
      isValidPositiveInteger(state.renewal) &&
      isValidPositiveInteger(state.noOfPatients) &&
      isValidPositiveInteger(state.noOfAccounts) &&
      isBoolean(state.instantBilling)
    );
  };

  return (
    <Fragment>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        {success.show && (
          <Success message={success.message} nextRoute="/AdminManageHealthPlans" timeOut={500}/>
        )}
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
					  successShow={success.show}
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
