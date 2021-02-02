import React, { useState } from "react";
import { updateDrugInventoryUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { notification } from "../../utils/notification";

const $ = window.$;

const UpdateInventory = ({ drug, fetchAllDrugs }) => {
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
        notification.success({ message: res.data.message})
        fetchAllDrugs()
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message })
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
                <label>Quantity</label>
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
