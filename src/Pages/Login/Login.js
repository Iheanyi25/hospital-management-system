import React, { Component } from "react";
import styles from "./css/Login.module.css";
import { InvalidDetails } from "../../Components/Alerts";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    apiUrl: process.env.REACT_APP_API_URL,
    email: "",
    password: "",
    submitting: false,
    error: false,
  };

  handleSubmit = async (e) => {
    this.setState({ submitting: true });
    e.preventDefault();
    const url = this.state.apiUrl;
    const { email, password } = this.state;
    const data = { email, password };
    console.log(data);
    if (email !== "" && password !== "") {
      try {
        let res = await fetch(`${url}/Auth/Login`, {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "POST",
          body: JSON.stringify(data),
          redirect: "follow",
        });
        if (res.status === 200) {
          console.log(res);
          const data = await res.json();
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "authenticatedUser",
            JSON.stringify(data.authenticatedUser)
          );

          window.location.reload();
        } else {
          console.log(res);
          this.setState({ error: true, submitting: false, password: "" });
        }
      } catch (error) { }
    }
  };

  setErrorStatus = () => {
    this.setState({ error: false });
  }

  render() {
    const { submitting, error, email, password } = this.state;
    return (
      <>
        <div className={styles.background}>
          {error ? <InvalidDetails setErrorStatus={this.setErrorStatus} /> : null}
          <div className={styles.div}>
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
            <h2>Login</h2>
            <form
              className={`${styles.form} needs-validation`}
              noValidate
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="Your Email Address"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please provide a valid email.
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="Your Password"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please provide a valid password.
                </div>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={submitting}
              >
                <span className="btn-icon icofont-location-arrow mr-2"></span>{" "}
                Login
              </button>

              <Link to="/resetmypassword">
                <button
                  className="btn btn-info text-white float-right"
                  type="button"
                  disabled={submitting}
                >
                  Forgot Password
              </button>
              </Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
