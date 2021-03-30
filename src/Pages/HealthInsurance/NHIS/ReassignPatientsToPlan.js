import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getNHISHealthPlansUrl,
  updatePatientNHISHealthPlanUrl,
} from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default function ReassignPatientToPlan() {
  const {
    push,
    location: { state },
  } = useHistory();
  console.log(state);
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [emptyField, setEmptyField] = useState(true);
  const getNHISHealthPlans = getNHISHealthPlansUrl(1, 200);
  const getNHISHealthPlansConfig = fetchConfig({
    url: getNHISHealthPlans,
    method: "get",
  });
  const { data } = useRequest(getNHISHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  let condition = state?.healthPlanName === "Primary" ? "Secondary" : "Primary";
  let nhisHealthPlanId;
  for (let i = 0; i < data?.nhisHealthPlans.length; i++) {
    if (data?.nhisHealthPlans[i].name === condition) {
      console.log(data?.nhisHealthPlans[i].id, "found");
      nhisHealthPlanId = data?.nhisHealthPlans[i].id;
    }
  }
  useEffect(() => {
    if (isNotEmptyString(authorizationCode)) {
      setEmptyField(false);
    }
  }, [authorizationCode]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      state?.healthPlanName === "Primary"
        ? {
            patientId: state?.patientId,
            id: state?.id,
            authorizationCode,
            nhisHealthPlanId,
          }
        : {
            patientId: state?.patientId,
            id: state?.id,
            nhisHealthPlanId,
          };
    console.log(payload);
    try {
      const assignPatientToNHISHealthPlan = updatePatientNHISHealthPlanUrl();
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
            <h4 className="page-title mb-0">
              {`Reassign Patient to ${
                state?.healthPlanName === "Primary" ? "Secondary" : "Primary"
              } health plan`}
            </h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Reassign</h4>
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
                      {state?.healthPlanName === "Primary" ? (
                        <div className="form-group">
                          <label>Authorization code</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) =>
                              setAuthorizationCode(e.target.value)
                            }
                            tabIndex={-98}
                          />
                        </div>
                      ) : null}
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="submit"
                            disabled={
                              emptyField && state?.healthPlanName === "Primary"
                                ? true
                                : false
                            }
                            className="btn btn-primary"
                          >
                            Reassign
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
