import React, { useEffect, useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { createWardUrl } from "../../../api/URLs";
import { PageLoader } from "../..";
import { notification } from "../../../utils/notification";
import {
  isNotEmptyString,
  isValidPositiveInteger,
} from "../../../utils/validationUtils";

const CreateWard = ({ history }) => {
  const [state, setState] = useState({
    name: "",
    capacity: "",
    description: "",
    chargePerNight: "",
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { name, capacity, chargePerNight } = state;
    if (
      isNotEmptyString(name) &&
      isValidPositiveInteger(capacity) &&
      isValidPositiveInteger(chargePerNight)
    ) {
      setEmptyField(false);
    }
  }, [state]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createWard = createWardUrl();
      const createWardConfig = fetchConfig({
        url: createWard,
        data: state,
        method: "post",
      });
      const res = await fetchWrapper(createWardConfig);
      notification.success({ message: res.data.message });
      history.push("/AdminManageWards");
    } catch (error) {
      console.log(error);
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
        <div className="main-content-wrap w-75">
          <div className="page-content">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form
                      className="mb-4 p-5"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <h4 className="text-center">Create a Ward</h4>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          placeholder="Name of Ward"
                          name="name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Capacity</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          placeholder="Room capacity"
                          name="capacity"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Charge per night</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          placeholder="Charge per night"
                          name="chargePerNight"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          placeholder="Enter description"
                          name="description"
                          multiple="true"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={emptyField ? true : false}
                          >
                            Submit
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
};

export default CreateWard;
