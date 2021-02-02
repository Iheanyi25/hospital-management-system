import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postPasswordUrl } from "../../../api/URLs";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

const ChangePassword = observer(()=> {
  const { user: { id: userId } } = useContext(UserContext)
  const [allPasswordDetails, setAllPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    submitting: false,
    passwordStatus: false,
    response: "",
    currentPasswordInputType: "password",
    newPasswordInputType: "password"
  });

  const {
    currentPassword,
    newPassword,
    submitting,
    passwordStatus,
    response,
    currentPasswordInputType,
    newPasswordInputType
  } = allPasswordDetails;

  const history = useHistory();

  const handleSubmit = async (e) => {
    setAllPasswordDetails({ ...allPasswordDetails, submitting: true });
    e.preventDefault();
    // const userId = JSON.parse(localStorage.getItem("authenticatedUser")).id;
    
    if (newPassword !== "" && currentPassword !== "") {
      const payload = {
        userId,
        currentPassword,
        newPassword,
      };
      try {
        const postPassword = postPasswordUrl();
        const postPasswordConfig = fetchConfig({
          url: postPassword,
          data: payload,
          method: "post",
        });
  
        const res = await fetchWrapper(postPasswordConfig);
        if (res.status === 200) {
          setAllPasswordDetails({
            ...allPasswordDetails,
            passwordStatus: true,
          });
          notification.success({ message: res.data.message})
          history.goBack()
        }
      } catch (error) {
        console.log(error.response.data)
        notification.error({ message: error?.response?.data.message[0].description})
      }
    }
  };

  const handleCurrentPasssword = (val) => {
    setAllPasswordDetails({ ...allPasswordDetails, currentPassword: val });
  };

  const handleNewPassword = (val) => {
    setAllPasswordDetails({ ...allPasswordDetails, newPassword: val });
  };

  const toggleCurrentPasswordView = () => {
    currentPasswordInputType === "password" ? setAllPasswordDetails({ ...allPasswordDetails, currentPasswordInputType: "text" }) : setAllPasswordDetails({ ...allPasswordDetails, currentPasswordInputType: "password" })
  }

  const toggleNewPasswordView = () => {
    newPasswordInputType === "password" ? setAllPasswordDetails({ ...allPasswordDetails, newPasswordInputType: "text" }) : setAllPasswordDetails({ ...allPasswordDetails, newPasswordInputType: "password" })
  }

  return (
    <main className="main-content">
      <div className="main-content-wrap">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-6">
              <div className="card border-light">
                <div className="card-body">
                  <form className="mb-4 p-5" onSubmit={(e) => handleSubmit(e)}>
                    <h4 className="text-center">Change Password!</h4>
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        className="form-control"
                        type={currentPasswordInputType}
                        name="currentPassword"
                        onChange={(e) => {
                          handleCurrentPasssword(e.target.value);
                        }}
                        required
                        autoComplete="off"
                      />
                      <div class="input-group-append eye-icon pull-right">
                        <i
                          class={currentPasswordInputType === "password" ? "icofont-eye" : "icofont-eye-blocked"}
                          onClick={(e) => toggleCurrentPasswordView()}
                        ></i>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        className="form-control"
                        type={newPasswordInputType}
                        name="newPassword"
                        onChange={(e) => {
                          handleNewPassword(e.target.value);
                        }}
                        required
                        autoComplete="off"
                      />
                      <div class="input-group-append eye-icon pull-right">
                        <i
                          class={newPasswordInputType === "password" ? "icofont-eye" : "icofont-eye-blocked"}
                          onClick={(e) => toggleNewPasswordView()}
                        ></i>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </button>
                    <p className="mt-3 text-danger text-center password-notice">Passwords must contain uppercase, numeric and special characters</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
})
export { ChangePassword };
