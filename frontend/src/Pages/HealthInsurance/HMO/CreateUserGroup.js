import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { creatHMOUserGroupUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

export default function CreateUserGroup() {
  const history = useHistory();
  const { hmoId } = useContext(UserContext);
  const [details, setDetails] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...details, hmoId };
    try {
      const creatHMOUserGroup = creatHMOUserGroupUrl();
      const creatHMOUserGroupConfig = fetchConfig({
        url: creatHMOUserGroup,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(creatHMOUserGroupConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        history.push("/ManageUserGroups");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(data);
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
            <h4 className="page-title mb-0">Create A User Group In HMO name</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Create User Group</h4>
                      <div className="form-group">
                        <label>User group Name</label>
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
                          <button type="submit" className="btn btn-primary">
                            Register user group
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
}
