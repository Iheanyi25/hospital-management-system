import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateHMOUserGroupUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

const EditUserGroup = observer(() => {
  const { state } = useLocation();
  const { hmoId } = useContext(UserContext);
  const history = useHistory();
  const [payload, setpayload] = useState({
    name: state?.name || "",
    description: state?.description || "",
    hmoId: hmoId,
  });

  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, id: state?.id };
    try {
      const updateHMOUserGroup = updateHMOUserGroupUrl();
      const updateHMOUserGroupConfig = fetchConfig({
        url: updateHMOUserGroup,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(updateHMOUserGroupConfig);
      if (res.status === 200) {
        notification.success({ mesage: res.data.message });
        history.push("/ManageUserGroups");
      }
    } catch (error) {
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
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Update User Group</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Edit User Group</h4>
                      <div className="form-group">
                        <label>Health Plan Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          onChange={handleChange}
                          name="name"
                          value={payload?.name}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="description"
                          tabIndex={-98}
                          onChange={handleChange}
                          value={payload?.description}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Save
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
export default EditUserGroup;
