import React, { useState } from "react";
import { InvalidDetails } from "../../../Components/Alerts/InvalidDetails";
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
  });

  const {
    currentPassword,
    newPassword,
    submitting,
    error,
    passwordStatus,
    response,
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
            history.push("/DoctorProfile");
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


  return (
    <main className="main-content">
      <div className="main-content-wrap">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-6">
              {error ? (
                <Success message={response} isError={true} timeOut={3000}/>
              ) : null}
              <div className="card border-light">
                <div className="card-body">
                  <form className="mb-4 p-5" onSubmit={(e) => handleSubmit(e)}>
                    <h4 className="text-center">Change Password!</h4>
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="currentPassword"
                        onChange={(e) => {
                          handleCurrentPasssword(e.target.value);
                        }}
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="newPassword"
                        onChange={(e) => {
                          handleNewPassword(e.target.value);
                        }}
                        required
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </button>
                    <Link to="/AdminDashboard" className="text-center mt-3">
                      <p
                        className="text-center mt-3"
                        style={{ color: "#007BFF" }}
                      >
                        Go back
                      </p>
                    </Link>
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
