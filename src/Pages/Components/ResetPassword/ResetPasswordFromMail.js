import React, { useState, useEffect } from "react";
import styles from "../../Login/css/Login.module.css";
import { InvalidDetails } from "../../../Components/Alerts/InvalidDetails";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postResetPasswordFromMailUrl } from "../../../api/URLs";

function ResetPasswordFromMail(props) {
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
    errorMessage: ""
  });

  const {
    newPassword,
    confirmPassword,
    userEmail,
    userToken,
    serverRes,
    submitting,
    error,
    errorMessage
  } = newPasswordDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== "" && confirmPassword !== "") {
        const payload = {
          authenticationToken: userToken,
          newPassword,
          email: userEmail
        }
        const resetPasswrdFromMail = postResetPasswordFromMailUrl();
        const resetPasswrdFromMailConfig = fetchConfig({
          url: resetPasswrdFromMail,
          data: payload,
          method: "post",
        });
        const res = await fetchWrapper(resetPasswrdFromMailConfig);
        console.log(res, 111111)
        if (res.status === 200) {
          console.log("Res is ", res);
          const data = res;
          setNewPasswordDetails({
            ...newPasswordDetails,
            serverRes: data.message,
          });
          props.history.push("/")
          // console.log('Data is ', data);
          // localStorage.setItem("token", data.token);
          // console.log(email, " from handleSubmit")
          // localStorage.setItem(
          //   "authenticatedUser",
          //   JSON.stringify(data.authenticatedUser)
          // );
        }
      }
    } catch (error) {

      console.log(error)
      setNewPasswordDetails({
        ...newPasswordDetails,
        errorMessage: error.response.data.message,
        error: true
      })
    }


  };
  const handleNewPasswordValue = (val) => {
    setNewPasswordDetails({ ...newPasswordDetails, newPassword: val });
    console.log(newPassword)
  };

  const handleConfirmPasswordValue = (val) => {
    setNewPasswordDetails({ ...newPasswordDetails, confirmPassword: val });
    console.log(confirmPassword)
  };

  return (
    <>
      <div>
        {error ? <InvalidDetails message={errorMessage} /> : null}
      </div>
      <div className="auth-background d-flex justify-content-center align-items-center">
        <div className="card border-light">
          <div className="card-body">
            <form className="mb-4 p-5" onSubmit={(e) => handleSubmit(e)}>
              <h4 className="text-center">Reset Password!</h4>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="passwword"
                  onChange={(e) => {
                    handleNewPasswordValue(e.target.value);
                  }}
                  placeholder="Enter your new password"
                  required
                />
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
              </div>
              <button
                type="submit"
                className="btn btn-block btn-primary"
                type="submit"
                disabled={submitting}
              >
                Create new password
                </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export { ResetPasswordFromMail };
