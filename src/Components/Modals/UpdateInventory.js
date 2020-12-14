import React, { useState } from "react";
import { updateDrugInventoryUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

const $ = window.$;

const UpdateInventory = ({ drug, setSuccess }) => {
  const [drugQuantity, setDrugQuantity] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const drugInventoryUrl = updateDrugInventoryUrl(drug.id, drugQuantity);
    const updateInventoryConfig = fetchConfig({
      url: drugInventoryUrl,
      method: "post",
    });
    try {
      let res = await fetchWrapper(updateInventoryConfig);
      console.log(res);
      if (res.status === 200) {
        $("#update-inventory").modal("hide");
        if (setSuccess) {
          setSuccess(res.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="update-inventory"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{`Update ${drug.name}`}</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Amount</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  onChange={(e) => {
                    setDrugQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">
                  Update Drug
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpdateInventory };
