import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { registerUserUrl } from "../../api/URLs";
import { isValidEmail } from "../../utils/validationUtils";
import { Success } from "../Alerts";


const user = {
  lab: "Lab Scientist",
  doctor: "Doctor",
  pharmacy: "Pharmacist",
  accountant: "Accountant"
}

const $ = window.$;
const RegisterUserModal = ({ userType }) => {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "Password101@",
    success: false,
    message: "",
    route: "",
  });

  const routes = {
    doctor: "/AdminAllDoctors",
    accountant: "/AdminAllAccountants",
    pharmacy: "/AdminAllPharmacists",
    lab: "/AdminAllLabTechnicians",
  };

  const handleChange = (name, e) => {
    const value = e.target.value;
    setState((state) => ({ ...state, [name]: value }));
  };
  const resetShowState = () =>
    setState((state) => ({
      ...state,
      success: false,
      email: "",
      firstName: "",
      lastName: "",
    }));

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName, password } = state;
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      roleName: userType,
    };
    console.log(data);
    const registerUrl = registerUserUrl();
    const registerUserConfig = fetchConfig({
      url: registerUrl,
      method: "post",
      data: data,
    });
    console.log(routes[userType]);
    try {
      const { status, message } = await fetchWrapper(registerUserConfig);
      if (status === 200) {
        setState({
          ...state,
          success: true,
          message: message,
          route: routes[userType],
        });
        setTimeout(() => {
          $("#add-user").modal("hide");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userType, "eklelkkled");
  const { email, firstName, lastName, success, message, route } = state;

  return (
    <>
      <div
        className="modal fade"
        id="add-user"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        {success ? (
          <Success
            message={message}
            nextRoute={route}
            callback={resetShowState}
          />
        ) : null}
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">
                Onboard a New{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {user[userType]}
                </span>
              </h5>
              <form className="p-5">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    onChange={(e) => handleChange("firstName", e)}
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    onChange={(e) => handleChange("lastName", e)}
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    onChange={(e) => handleChange("email", e)}
                    value={email}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="row mt-4">
                  <div className="col text-left">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                  <div className="col text-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => registerUser(e)}
                      disabled={
                        !isValidEmail(email) ||
                        firstName === "" ||
                        lastName === ""
                          ? true
                          : false
                      }
                    >
                      Register User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { RegisterUserModal };
