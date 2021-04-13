import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import { getAllActiveHealthPlansUrl, postDrugPricesUrl } from "../../api/URLs";

const $ = window.$;

const CreateHealthPlanPrice = ({ drugId, mutate }) => {
  const [payload, setPayload] = useState({
    drugId: drugId,
    healthPlanId: "",
    pricePerUnit: "",
    pricePerContainer: "",
    pricePerCarton: "",
  });
  const getHealthPlansUrl = getAllActiveHealthPlansUrl(1, 200);
  const getHealthPlanConfig = fetchConfig({
    url: getHealthPlansUrl,
    method: "get",
  });
  const { data } = useRequest(getHealthPlanConfig, {
    revalidateOnFocus: false,
  });
console.log(data,"data");
  const healthplans = data?.plans;
  console.log(healthplans, "dewjke");

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    const drugPricesUrl = postDrugPricesUrl();
    const postDrugPricesConfig = fetchConfig({
      url: drugPricesUrl,
      method: "post",
      data: payload,
    });
    try {
      let res = await fetchWrapper(postDrugPricesConfig);
      console.log(res);
      if (res.status === 200) {
        $("#create-healthplan-price").modal("hide");
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="create-healthplan-price"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Create price for health plan</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select health plan</label>
                <select
                  className="form-control"
                  name="healthPlanId"
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select a plan
                  </option>
                  {healthplans?.map((healthplan, index) => (
                    <option value={healthplan.id} key={index}>
                      {healthplan.name}
                    </option>
                  )) ?? <option value="Monday">Nothing yet</option>}
                </select>
              </div>
              <div className="form-group">
                <label>Price per Pill</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="pricePerUnit"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Price per pack</label>
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
              <div className="col"></div>
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">
                  Create Price
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateHealthPlanPrice };
