import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import "./css/Login.css";
import { InvalidDetails } from "../../Components/Alerts";
import { Link } from "react-router-dom";
import { UserContext } from "../../mobx/UserState";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { logInUrl } from "../../api/URLs";
import logoMakeshift from "../../assets/img/logo-makeshift.svg";
import { notification } from "../../utils/notification";

const Login = observer(() => {
  const { loading, error, logIn } = useContext(UserContext);
  const [state, setState] = useState({
    email: "",
    password: "",
    submitting: false,
    response: "",
    inputType: "password"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    const data = { email, password };
    logIn(data);
  };

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    const params = new URLSearchParams(window.location.search);
    const userEmailFromLink = params.get("email");
    const userTokenFromLink = params.get("token");

    if (userEmailFromLink !== "" && userTokenFromLink !== "") {
      try {
        const payload = {
          email: userEmailFromLink,
          authenticationToken: userTokenFromLink,
        };
        const logIn = logInUrl();
        const logInConfig = fetchConfig({
          url: logIn,
          data: payload,
          method: "post",
        });
        const res = await fetchWrapper(logInConfig);

        if (res.status === 200) {
          notification.success({ message : res.data.message})
          window.location.reload();
        }
      } catch (error) {
        console.log(error)
        // notification.error({ message : error?.response?.data?.message})
      }
    }
  };

  const handleChange = (name, value) => {
    setState(state => ({ ...state, [name]: value }))
  }

  const togglePasswordView = () => {
    inputType === "password" ?  setState({ ...state, inputType: "text" }) : setState({ ...state, inputType: "password" })
  }

  const { email, password, inputType } = state;
  return (
    <div className="auth-background">
      {error ? (
        <InvalidDetails
          // setErrorStatus={setErrorStatus}
          message={
            error?.message === "Network Error"
              ? error?.message
              : "Invalid log in details"
          }
        />
      ) : null}
      <div className="row mx-0 d-flex justify-content-center align-items-center">
        <div className="">
          <img src={logoMakeshift} alt="logo" />
          <h1 className="text-white">Hospital Management Solution</h1>
          <p className="text-white">
            It was some time before he obtained any answer, and the reply, when
            made, was unpropitious. After exchanging a mute glance or two, the
            hermit went to the further side of the hut, and opened a hutch,
            which was concealed with great care and some ingenuity.{" "}
          </p>
        </div>
        <div className="">
          <div className="card border-light">
            <div className="card-body">
              <form className="mb-4 p-5" onSubmit={(e) => handleSubmit(e)}>
                <h4 className="text-center">Welcome back!</h4>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    tabIndex={-98}
                    name="email"
                    value={email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control pr-2"
                    type={inputType}
                    name="password"
                    value={password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                  <div class="input-group-append eye-icon pull-right text-muted">
                      <i
                      class={inputType !== "password" ? "icofont-eye" : "icofont-eye-blocked"}
                      onClick={(e) => togglePasswordView()}
                      ></i>
                  </div>
                </div>
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  Log in
                </button>
                <Link to="/ResetPasswordRedirect" className="text-center mt-3">
                  <p className="text-center mt-3" style={{ color: "#007BFF" }}>
                    Forgot Password
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
