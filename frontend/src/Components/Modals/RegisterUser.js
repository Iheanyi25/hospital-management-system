import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { registerUserUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { isValidEmail } from "../../utils/validationUtils";

const user = {
  lab: "Lab Scientist",
  doctor: "Doctor",
  nurse: "Nurse",
  pharmacy: "Pharmacist",
  accountant: "Accountant",
};

const $ = window.$;
const RegisterUserModal = ({ userType }) => {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "Password101@",
    message: "",
    isRegistering: false,
  });
  const history = useHistory();
  const routes = {
    doctor: "/AdminAllDoctors",
    nurse: "/AdminAllNurses",
    accountant: "/AdminAllAccountants",
    pharmacist: "/AdminAllPharmacists",
    labAttendant: "/AdminAllLabTechnicians",
  };

  const handleChange = (name, e) => {
    const value = e.target.value;
    setState((state) => ({ ...state, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      setState((state) => ({ ...state, isRegistering: true }));
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

      const { data: dataRes } = await fetchWrapper(registerUserConfig);
      setState((state) => ({
        ...state,
        email: "",
        firstName: "",
        lastName: "",
        isRegistering: false,
      }));
      $("#add-user").modal("hide");
      notification.success({ message: dataRes.message });
      history.push(routes[userType.toLowerCase()]);
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
      setState((state) => ({ ...state, isRegistering: false }));
    }
  };

  console.log(userType, "eklelkkled");
  const { email, firstName, lastName, isRegistering } = state;

  return (
    <>
      <div
        className="modal fade"
        id="add-user"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
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
                      onClick={() =>
                        setState({ firstName: "", lastName: "", email: "" })
                      }
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
                        lastName === "" ||
                        isRegistering
                      }
                    >
                      {isRegistering ? "Registering..." : "Register User"}
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
