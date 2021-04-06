import React, { useEffect, useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { createBedUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { isNotEmptyString } from "../../utils/validationUtils";

const $ = window.$;

const AddBed = ({ wardId, mutate }) => {
  console.log(wardId);
  const [name, setName] = useState("");
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(name)) {
      setEmptyField(false);
    } else {
      setEmptyField(true)
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      wardId,
    };
    console.log(payload);
    if (Object.values(payload).includes("")) {
      return;
    }
    try {
      const createBed = createBedUrl();
      const createBedConfig = fetchConfig({
        url: createBed,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createBedConfig);

      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $("#add-bed").modal("hide");
      }
    } catch (error) {
      console.log(error);
      const errMessage = error?.response?.data?.message || "An error occurred";
      notification.error({ message: errMessage });
    }
  };

  return (
    <div
      className="modal fade"
      id="add-bed"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add Bed</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name of bed"
                />
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button
                  type="submit"
                  disabled={emptyField ? true : false}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddBed };
