import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../Login/css/Login.module.css";
import { InvalidDetails } from "../../../Components/Alerts/InvalidDetails";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { postResetPasswordUrl } from "../../../api/URLs";

function ResetPassword() {
  const [allPasswordDetails, setAllPasswordDetails] = useState({
    email: "",
    submitting: false,
    error: false,
    emailStatus: false,
    response: "",
  });

  const {
    email,
    submitting,
    error,
    emailStatus,
    response,
  } = allPasswordDetails;

  const handleSubmit = async (e) => {
    setAllPasswordDetails({ ...allPasswordDetails, submitting: true });
    e.preventDefault();

    if (email !== "") {
      const postResetPassword = postResetPasswordUrl(email)
      const postResetPasswordConfig = fetchConfig({url : postResetPassword, method : 'post'})
      const res = await fetchWrapper(postResetPasswordConfig)

      if (res.status === 200) {
        console.log("Res is ", res);
        const data = res;
        setAllPasswordDetails({
          ...allPasswordDetails,
          response: data.message,
          emailStatus: true,
        });
        console.log("Data is ", data);
        // localStorage.setItem("token", data.token);
        console.log(email, " from handleSubmit");
        // localStorage.setItem(
        //   "authenticatedUser",
        //   JSON.stringify(data.authenticatedUser)
        // );
      }
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
    setAllPasswordDetails({ ...allPasswordDetails, error: false });
  };

  return (
    // <>
    //   <main className={`${styles.background} main-content`}>
    //     {error ? <InvalidDetails setErrorStatus={setErrorStatus()} /> : null}

    //     <div className="main-content-wrap col-lg-4 col-md-6 col-sm-6 col-xs-6">
    //       <div className="page-content">
    //         <div className="row justify-content-center">
    //           <div className="col col-md-12">
    //             <div className="card border-light">
    //               <div className="card-body bg-light pb-5">
    //                 <form
    //                   className={`${styles.form} needs-validation`}
    //                   onSubmit={(e) => handleSubmit(e)}
    //                   noValidate
    //                 >
    //                   <h4 className="text-center">Reset Password</h4>
    //                   {emailStatus === false ? (
    //                     <>
    //                       <div className="form-group">
    //                         <div className="form-group">
    //                           <label>Email</label>
    //                           <input
    //                             className="form-control"
    //                             type="email"
    //                             name="email"
    //                             onChange={(e) => {
    //                               handleEmailValue(e.target.value);
    //                             }}
    //                             placeholder="Your Email Address"
    //                             required
    //                           />
    //                           <div className="valid-feedback">Looks good!</div>
    //                           <div className="invalid-feedback">
    //                             Oops! should be numbers only.
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div className="m-auto">
    //                         <div className="row">
    //                           <button
    //                             className="btn btn-primary"
    //                             type="submit"
    //                             disabled={submitting}
    //                           >
    //                             <span className="btn-icon icofont-location-arrow mr-2"></span>{" "}
    //                             Submit
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </>
    //                   ) : (
    //                     <>
    //                       <p className="text-center"> {response} </p>
    //                       <p className="text-center">
    //                         {" "}
    //                         {`Hello, click the link that was sent to ${email} to reset your password`}{" "}
    //                       </p>
    //                     </>
    //                   )}
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </>
    <>
      <div className={styles.background}>
        {error ? <InvalidDetails setErrorStatus={setErrorStatus()} /> : null}
        <div className={styles.div} style={{ height: "400px" }}>
          <h1>
            <img
              src="./assets/img/logo.svg"
              alt="logo"
              width={147}
              height={33}
              className="logo-img"
            />
            Hospital Management Solution
          </h1>
          <h2>Reset Password</h2>
          <form
            className={`${styles.form} needs-validation`}
            onSubmit={(e) => handleSubmit(e)}
            noValidate
          >
            {emailStatus === false ? (
              <>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      handleEmailValue(e.target.value);
                    }}
                    placeholder="Your Email Address"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide a valid email.
                  </div>
                </div>
                <div className="row justify-content-between">
                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    disabled={submitting}
                  >
                    <span className="btn-icon icofont-location-arrow mr-2"></span>{" "}
                    Submit
                  </button>
                  <Link to="/Login" className="justify-self-right mt-3">
                    <p className="mt-3">Back to Log in</p>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-center"> {response} </p>
                <p className="text-center">
                  {" "}
                  {`Hello, click the link that was sent to ${email} to reset your password`}{" "}
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
export { ResetPassword };
