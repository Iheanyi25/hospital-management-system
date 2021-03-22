import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { getAllDrugsUrl, createNHISHealthPlanDrugUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";

export default function AddDrugToNHIS() {
  const [drug, setDrug] = useState();
  const {
    push,
    location: { state: healthPlanName },
  } = useHistory();
  const { id: nhisHealthPlanId } = useParams();

  const getDrugsUrl = getAllDrugsUrl(1, 200);
  const getDrugConfig = fetchConfig({
    url: getDrugsUrl,
    method: "get",
  });
  const { data, error } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });
  let options = [];
  if (data?.drugs.length > 0) {
    data.drugs.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }
  const handleChange = (drug) => {
    setDrug(drug);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { drugId: drug.value, nhisHealthPlanId };
    try {
      const createNHISHealthPlanDrug = createNHISHealthPlanDrugUrl();
      const createNHISHealthPlanDrugConfig = fetchConfig({
        url: createNHISHealthPlanDrug,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createNHISHealthPlanDrugConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        push({
          pathname: `/AdminManageNHISDrugs/${nhisHealthPlanId}`,
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
            <h4 className="page-title mb-0">{`Add A Drug To ${healthPlanName} Health Plan`}</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Add Drug</h4>
                      <div className="form-group">
                        <label>Search & select drug(s)</label>
                        <Select
                          value={drug}
                          onChange={handleChange}
                          isSearchable={true}
                          options={options}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
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
