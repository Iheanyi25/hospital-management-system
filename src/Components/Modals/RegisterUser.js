import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { registerUserUrl } from "../../api/URLs";
import { isValidEmail } from "../../utils/validationUtils";
import { Success } from "../Alerts";

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
    accountant: "/AdminAllDoctors",
    pharmacy: "/AdminAllPharmacists",
    lab: "/AdminAllLabTechnicians",
  };

  const handleChange = (name, e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

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
      const response = await fetchWrapper(registerUserConfig);
      if (response.status === 200) {
        setState({
          ...state,
          success: true,
          message: response.message,
          route: routes[userType],
        });
        $("#add-user").modal("hide");
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
        {success ? <Success message={message} nextRoute={route} /> : null}
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">
                Onboard a New{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {userType === "pharmacy" ? "Pharmacist" : userType}
                </span>
              </h5>
              <form className="p-5">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    onChange={(e) => handleChange("firstName", e)}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    onChange={(e) => handleChange("lastName", e)}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    onChange={(e) => handleChange("email", e)}
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
