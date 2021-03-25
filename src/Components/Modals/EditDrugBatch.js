import React, { useEffect, useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { updateDrugBatchUrl } from "../../api/URLs";
import { formatInputDate } from "../../utils/formatInputDate";
import { notification } from "../../utils/notification";
import { isNotEmptyString } from "../../utils/validationUtils";

const $ = window.$;

const EditDrugBatch = ({ drugId, mutate, batch }) => {
  const [payload, setPayload] = useState({
    quantityInStock: "",
    expiryDate: "",
  });
  useEffect(() => {
    setPayload({
      quantityInStock: batch.quantityInStock,
      expiryDate: batch.expiryDate,
    });
  }, [batch.quantityInStock, batch.expiryDate]);
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { quantityInStock, expiryDate } = payload;
    if (isNotEmptyString(quantityInStock) && isNotEmptyString(expiryDate)) {
      setEmptyField(false);
    }
  }, [payload]);
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, drugId, id: batch.id };
    const updateDrugBatch = updateDrugBatchUrl();
    const updateDrugBatchConfig = fetchConfig({
      url: updateDrugBatch,
      method: "post",
      data: data,
    });
    try {
      let res = await fetchWrapper(updateDrugBatchConfig);
      console.log(res);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $("#edit-batch").modal("hide");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };
  return (
    <div
      className="modal fade"
      id="edit-batch"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Edit Batch</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Quantity in stock</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="quantityInStock"
                  value={payload.quantityInStock}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  className="form-control"
                  type="date"
                  min={formatInputDate()}
                  tabIndex={-98}
                  name="expiryDate"
                  value={payload.expiryDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button
                  type="submit"
                  disabled={emptyField ? true : false}
                  className="btn btn-primary"
                >
                  Edit batch
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EditDrugBatch };
