import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postResetPasswordUrl } from "../../../api/URLs";
import { InvalidDetails } from "../../../Components/Alerts";
import { notification } from "../../../utils/notification";

function ResetPassword() {
  const [allPasswordDetails, setAllPasswordDetails] = useState({
    email: "",
    submitting: false,
    emailError: "",
    emailStatus: false,
    response: "",
  });

  const {
    email,
    submitting,
    emailError,
    emailStatus,
    response,
  } = allPasswordDetails;

  const handleSubmit = async (e) => {
    setAllPasswordDetails({ ...allPasswordDetails, submitting: true });
    e.preventDefault();
    try {
      if (email !== "") {
        const postResetPassword = postResetPasswordUrl(email);
        const postResetPasswordConfig = fetchConfig({
          url: postResetPassword,
          method: "post",
        });
        const res = await fetchWrapper(postResetPasswordConfig);
        console.log(res, 3333);
        if (res.status === 200) {
          notification.success({ message: res.data.message });
        }
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };
  const handleEmailValue = (val) => {
    setAllPasswordDetails({
      ...allPasswordDetails,
      email: val,
      emailStatus: false,
    });
  };

  const setErrorStatus = () => {
    setAllPasswordDetails({
      emailError: "",
      emailStatus: false,
    });
  };

  return (
    <>
      <div>
        {emailError !== "" ? (
          <InvalidDetails
            setErrorStatus={setErrorStatus}
            message={emailError}
          />
        ) : null}
      </div>
      <div className="auth-background d-flex justify-content-center align-items-center">
        <div className="card border-light">
          <div className="card-body">
            <form className="mb-4 p-5" onSubmit={(e) => handleSubmit(e)}>
              {emailStatus === false ? (
                <>
                  <h4 className="text-center">Reset Password!</h4>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => handleEmailValue(e.target.value)}
                      tabIndex={-98}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-primary"
                    disabled={submitting}
                  >
                    Reset Password
                  </button>
                  <Link to="/" className="text-center mt-3">
                    <p
                      className="text-center mt-3"
                      style={{ color: "#007BFF" }}
                    >
                      Back to Log in
                    </p>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-center text-dark"> {response} </p>
                  <p
                    className="text-center text-dark"
                    style={{ color: "#00000" }}
                  >
                    {" "}
                    {`Hello, click the link that was sent to ${email} to reset your password`}{" "}
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export { ResetPassword };
