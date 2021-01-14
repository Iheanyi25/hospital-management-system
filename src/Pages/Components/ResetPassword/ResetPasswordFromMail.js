import React, { useState, useEffect } from "react";
import styles from "../../Login/css/Login.module.css";
import { InvalidDetails } from "../../../Components/Alerts/InvalidDetails";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postResetPasswordFromMailUrl } from "../../../api/URLs";

function ResetPasswordFromMail() {
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
  });

  const {
    newPassword,
    confirmPassword,
    userEmail,
    userToken,
    serverRes,
    submitting,
    error,
  } = newPasswordDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== "" && confirmPassword !== "") {
      const resetPasswrdFromMail = postResetPasswordFromMailUrl(
        userToken,
        newPassword,
        userEmail
      );
      const resetPasswrdFromMailConfig = fetchConfig({
        url: resetPasswrdFromMail,
        method: "post",
      });
      const res = await fetchWrapper(resetPasswrdFromMailConfig);

      if (res.status === 200) {
        console.log("Res is ", res);
        const data = res;
        setNewPasswordDetails({
          ...newPasswordDetails,
          serverRes: data.message,
        });
        // console.log('Data is ', data);
        // localStorage.setItem("token", data.token);
        // console.log(email, " from handleSubmit")
        // localStorage.setItem(
        //   "authenticatedUser",
        //   JSON.stringify(data.authenticatedUser)
        // );
      }
    }
  };
  const handleNewPasswordValue = (val) => {
    setNewPasswordDetails({ ...newPasswordDetails, newPassword: val });
  };

  const handleConfirmPasswordValue = (val) => {
    setNewPasswordDetails({ ...newPasswordDetails, confirmPassword: val });
  };

  const setErrorStatus = () => {
    setNewPasswordDetails({ ...newPasswordDetails, error: false });
  };

  return (
    // <>
    //     <main className={`${styles.background} main-content`}>
    //         {error ? <InvalidDetails setErrorStatus={setErrorStatus()} /> : null}

    //         <div className="main-content-wrap col-lg-4 col-md-6 col-sm-6 col-xs-6">
    //             <div className="page-content">
    //                 <div className="row justify-content-center">
    //                     <div className="col col-md-12">
    //                         <div className="card border-light">
    //                             <div className="card-body bg-light pb-5">
    //                                 <form
    //                                     className={`${styles.form} needs-validation`}
    //                                     noValidate
    //                                     onSubmit={(e) => handleSubmit(e)}
    //                                 >
    //                                     <h4 className="text-center">Hospital Management Solution</h4>
    //                                     <h5 className="text-center h6">Reset Password </h5>

    //                                     <div className="form-group">
    //                                         <div className="valid-feedback">Looks good!</div>
    //                                         <div className="invalid-feedback">
    //                                             Oops! should be numbers only.
    //                   </div>
    //                                         <div className="form-group">
    //                                             <label>Password</label>
    //                                             <input
    //                                                 className="form-control"
    //                                                 type="text"
    //                                                 name="passwword"
    //                                                 onChange={(e) => {
    //                                                     handleNewPasswordValue(e.target.value);
    //                                                 }}
    //                                                 placeholder="Enter your password"
    //                                                 required
    //                                             />
    //                                         </div>

    //                                         <div className="form-group">
    //                                             <label>Confirm Password</label>
    //                                             <input
    //                                                 className="form-control"
    //                                                 type="text"
    //                                                 name="confirm_password"
    //                                                 onChange={(e) => {
    //                                                     handleConfirmPasswordValue(e.target.value);
    //                                                 }}
    //                                                 placeholder="Confirm your password"
    //                                                 required
    //                                             />
    //                                         </div>

    //                                     </div>
    //                                     <div className="m-auto">
    //                                         <div className="row">
    //                                             <button className="btn btn-primary" type="submit" disabled={submitting}>
    //                                                 <span className="btn-icon icofont-location-arrow mr-2"></span>{" "}
    //                                                 create new password
    //                                                 </button>
    //                                         </div>
    //                                     </div>
    //                                 </form>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </main>
    // </>
    <div className="auth-background d-flex justify-content-center align-items-center">
      {error ? <InvalidDetails setErrorStatus={setErrorStatus()} /> : null}
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
                    placeholder="Enter your password"
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
                    placeholder="Confirm your password"
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
  );
}
export { ResetPasswordFromMail };
