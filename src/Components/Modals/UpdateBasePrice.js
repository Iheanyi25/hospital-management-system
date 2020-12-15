import React, { useState } from "react";
import { updateDrugBasePriceUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

const $ = window.$;

const UpdateBasePrice = ({ basePrice, drugId, mutate }) => {
  const [payload, setPayload] = useState({
    drugId: drugId,
    defaultPricePerUnit: basePrice.defaultPricePerUnit,
    defaultPricePerContainer: basePrice.defaultPricePerContainer,
    defaultPricePerCarton: basePrice.defaultPricePerCarton,
  });

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    const drugBasePriceUrl = updateDrugBasePriceUrl();
    const updateDrugBasePriceConfig = fetchConfig({
      url: drugBasePriceUrl,
      method: "post",
      data: payload
    });
    try {
      let res = await fetchWrapper(updateDrugBasePriceConfig);
      console.log(res);
      if (res.status === 200) {
        $("#update-base-price").modal("hide");
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="update-base-price"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Update Base Price</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-group">
                  <label>Price per Pill</label>
                  <input
                    className="form-control"
                    type="number"
                    tabIndex={-98}
                    name="defaultPricePerUnit"
                    value={payload.defaultPricePerUnit}
                    onChange={handleChange}
                  />
                </div>
                <label>Price per pack</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="defaultPricePerContainer"
                  value={payload.defaultPricePerContainer}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Price per Carton</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="defaultPricePerCarton"
                  value={payload.defaultPricePerCarton}
                  onChange={handleChange}
                />
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">
                  Save price
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpdateBasePrice };
