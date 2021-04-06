import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { createHMODrugPriceUrl, getAllDrugsUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default function AddDrugToPlan() {
  const [drug, setDrug] = useState();
  const [emptyField, setEmptyField] = useState(true);
  const [payload, setPayload] = useState({
    pricePerUnit: "",
    pricePerContainer: "",
    pricePerCarton: "",
  });
  const {
    goBack,
    location: { state: healthPlanName },
  } = useHistory();
  const { id: hmoHealthPlanId } = useParams();

  useEffect(() => {
    const { pricePerUnit, pricePerCarton, pricePerContainer } = payload;
    if (
      isNotEmptyString(pricePerUnit) &&
      isNotEmptyString(pricePerCarton) &&
      isNotEmptyString(pricePerContainer)
    ) {
      setEmptyField(false);
    }
  }, [payload]);

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
  const handleSelect = (drug) => {
    setDrug(drug);
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, drugId: drug.value, hmoHealthPlanId };
    try {
      const createNHISHealthPlanDrug = createHMODrugPriceUrl();
      const createNHISHealthPlanDrugConfig = fetchConfig({
        url: createNHISHealthPlanDrug,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(createNHISHealthPlanDrugConfig);
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
            <h4 className="page-title mb-0">{`Add Drug To ${healthPlanName}`}</h4>
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
                          onChange={handleSelect}
                          isSearchable={true}
                          options={options}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per unit</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="pricePerUnit"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per container</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="pricePerContainer"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per Carton</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="pricePerCarton"
                          onChange={handleChange}
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
                            Add drug
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
