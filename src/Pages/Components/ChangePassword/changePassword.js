import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Success } from "../../../Components/Alerts/Success";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postPasswordUrl } from "../../../api/URLs";

function ChangePassword() {
  const [allPasswordDetails, setAllPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    submitting: false,
    error: false,
    passwordStatus: false,
    response: "",
    currentPasswordInputType: "password",
    newPasswordInputType: "password"
  });

  const {
    currentPassword,
    newPassword,
    submitting,
    error,
    passwordStatus,
    response,
    currentPasswordInputType,
    newPasswordInputType
  } = allPasswordDetails;

  const history = useHistory();

  const handleSubmit = async (e) => {
    setAllPasswordDetails({ ...allPasswordDetails, submitting: true });
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("authenticatedUser")).id;

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
        console.log(postPasswordConfig);
        const res = await fetchWrapper(postPasswordConfig);
        console.log(res, 11111);
        if (res.status === 200) {
          console.log("Res is ", res);
          const { data } = res;
          setAllPasswordDetails({
            ...allPasswordDetails,
            passwordStatus: true,
            response: data.message,
          });
          console.log("Data is ", data);
          setTimeout(() => {
            window.history.back();
          }, 1500);
        }
      } catch (err) {
        setAllPasswordDetails({
          ...allPasswordDetails,
          error: true,
          response: err.response.data.message[0].description
        })
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
              {error ? (
                <Success message={response} isError={true} timeOut={3000} />
              ) : null}
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
                    <p className="mt-3 text-danger password-notice">Password must contain uppercase, numberic and special characters</p>
                    {passwordStatus === true ? (
                      <Success message={response} />
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export { ChangePassword };
