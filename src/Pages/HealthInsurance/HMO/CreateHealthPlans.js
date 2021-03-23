import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { PageLoader } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { isNotEmptyString } from "../../../utils/validationUtils";

const CreateHealthPlan = observer(() => {
  const { hmoId } = useContext(UserContext);
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    hmoId
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { name } = payload;
    if (isNotEmptyString(name)) {
      setEmptyField(false);
    }
  }, [payload]);
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
  }
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Create Health Plan</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Create Health Plan</h4>
                      <div className="form-group">
                        <label>Health Plan Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          name="name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="description"
                          onChange={handleChange}
                          tabIndex={-98}
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
                            Create Plan
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
});

export default CreateHealthPlan;
