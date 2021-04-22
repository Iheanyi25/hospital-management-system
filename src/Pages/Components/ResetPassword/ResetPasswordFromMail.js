import React, { useState } from "react";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postResetPasswordFromMailUrl } from "../../../api/URLs";
import { Link, useHistory } from "react-router-dom";
import { notification } from "../../../utils/notification";

function ResetPasswordFromMail() {
  const { push } = useHistory();
  const params = new URLSearchParams(window.location.search);
  const userEmailFromLink = params.get("email");
  const userTokenFromLink = params.get("token");
  const [newPasswordDetails, setNewPasswordDetails] = useState({
    newPassword: "",
    confirmPassword: "",
    userEmail: userEmailFromLink,
    userToken: userTokenFromLink,
    serverRes: "",
    submitting: false,
    error: false,
    errorMessage: "",
    newPasswordInputType: "password",
    confirmPasswordInputType: "password",
  });

  const {
    newPassword,
    confirmPassword,
    userEmail,
    userToken,
    submitting,
    newPasswordInputType,
    confirmPasswordInputType,
  } = newPasswordDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewPasswordDetails({ submitting: true });
    if (newPassword === confirmPassword) {
      try {
        const payload = {
          authenticationToken: userToken,
          newPassword,
          email: userEmail,
        };
        const resetPasswrdFromMail = postResetPasswordFromMailUrl();
        const resetPasswrdFromMailConfig = fetchConfig({
          url: resetPasswrdFromMail,
          data: payload,
          method: "post",
        });
        const res = await fetchWrapper(resetPasswrdFromMailConfig);
        if (res.status === 200) {
          notification.success({ message: res.data.message });
          push("/");
        }
      } catch (error) {
        setNewPasswordDetails({ submitting: false });
        notification.error({ message: error?.response?.data.message });
      }
    } else {
      setNewPasswordDetails({ submitting: false });
      notification.error({ message: "Your passwords do not match" });
    }
  };
  const handleNewPasswordValue = (val) => {
    setNewPasswordDetails({ ...newPasswordDetails, newPassword: val });
  };

  const handleConfirmPasswordValue = (val) => {
    setNewPasswordDetails({ ...newPasswordDetails, confirmPassword: val });
  };

  const toggleNewPasswordView = () => {
    newPasswordInputType === "password"
      ? setNewPasswordDetails({
          ...newPasswordDetails,
          newPasswordInputType: "text",
        })
      : setNewPasswordDetails({
          ...newPasswordDetails,
          newPasswordInputType: "password",
        });
  };

  const toggleConfirmPasswordView = () => {
    confirmPasswordInputType === "password"
      ? setNewPasswordDetails({
          ...newPasswordDetails,
          confirmPasswordInputType: "text",
        })
      : setNewPasswordDetails({
          ...newPasswordDetails,
          confirmPasswordInputType: "password",
        });
  };

  return (
    <>
      <div className="auth-background d-flex justify-content-center align-items-center">
        <div className="card border-light">
          <div className="card-body">
            <form className="mb-4 p-5" onSubmit={(e) => handleSubmit(e)}>
              <h4 className="text-center">Reset Password!</h4>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type={newPasswordInputType}
                  name="passwword"
                  onChange={(e) => {
                    handleNewPasswordValue(e.target.value);
                  }}
                  placeholder="Enter your new password"
                  required
                />
                <div className="input-group-append eye-icon pull-right">
                  <i
                    className={
                      newPasswordInputType === "password"
                        ? "icofont-eye"
                        : "icofont-eye-blocked"
                    }
                    onClick={(e) => toggleNewPasswordView()}
                  ></i>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirm_password"
                  onChange={(e) => {
                    handleConfirmPasswordValue(e.target.value);
                  }}
                  placeholder="Confirm your new password"
                  required
                />
                <div className="input-group-append eye-icon pull-right">
                  <i
                    className={
                      confirmPasswordInputType === "password"
                        ? "icofont-eye"
                        : "icofont-eye-blocked"
                    }
                    onClick={(e) => toggleConfirmPasswordView()}
                  ></i>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-block btn-primary"
                disabled={submitting}
              >
                Create new password
              </button>
              <Link to="/" className="text-center mt-3">
                <p className="text-center mt-3" style={{ color: "#007BFF" }}>
                  Back to Log in
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export { ResetPasswordFromMail };
