import React, { useState, useEffect } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { updateDrugPricesUrl } from "../../api/URLs";

const $ = window.$;

const EditHealthPlanPrice = ({ healthPlanPrice, mutate }) => {
  const [payload, setPayload] = useState({});
  useEffect(() => {
    setPayload({
      id: healthPlanPrice.id,
      drugId: healthPlanPrice.drugId,
      healthPlanId: healthPlanPrice.healthPlanId,
      pricePerUnit: healthPlanPrice.pricePerUnit,
      pricePerContainer: healthPlanPrice.pricePerContainer,
      pricePerCarton: healthPlanPrice.pricePerCarton,
    });
  }, [healthPlanPrice]);

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    const drugPriceUrl = updateDrugPricesUrl();
    const updateDrugPricesConfig = fetchConfig({
      url: drugPriceUrl,
      method: "post",
      data: payload,
    });
    try {
      let res = await fetchWrapper(updateDrugPricesConfig);
      console.log(res);
      if (res.status === 200) {
        $("#edit-healthplan-price").modal("hide");
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="edit-healthplan-price"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{`Edit price for ${healthPlanPrice?.healthPlan?.name}`}</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Price per Pill</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="pricePerUnit"
                  value={payload.pricePerUnit}
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
                  value={payload.pricePerContainer}
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
                  value={payload.pricePerCarton}
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

export { EditHealthPlanPrice };
